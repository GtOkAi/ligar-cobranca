'use strict';

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const ZENVIA_TOKEN = process.env.ZENVIA_TOKEN;
const ZENVIA_PHONE_NUMBER = process.env.ZENVIA_PHONE_NUMBER;

// Função para log condicional baseado no modo debug
const debugLog = (message, debug = false) => {
    if (debug) {
        console.log(message);
    }
};

// Função para salvar token no arquivo .env
const salvarToken = (token) => {
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';

    // Verifica se o arquivo .env existe
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Remove espaços em branco e quebras de linha extras
    envContent = envContent.trim();

    // Atualiza ou adiciona o token
    if (envContent.includes('ZENVIA_TOKEN=')) {
        envContent = envContent.replace(/ZENVIA_TOKEN=.*/, `ZENVIA_TOKEN=${token}`);
    } else {
        envContent += `\nZENVIA_TOKEN=${token}`;
    }

    // Garante que o arquivo termine com uma quebra de linha
    if (!envContent.endsWith('\n')) {
        envContent += '\n';
    }

    // Salva o arquivo
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Token salvo com sucesso no arquivo .env');
    console.log('🔍 Token atual:', token);
};

// Função para formatar número brasileiro
const formatarNumero = (numero) => {
    // Remove todos os caracteres não numéricos
    numero = numero.replace(/\D/g, '');
    
    // Se o número começa com 0, remove o 0
    if (numero.startsWith('0')) {
        numero = numero.substring(1);
    }
    
    // Se o número não começa com 55 e tem 10 ou 11 dígitos (DDD + número), adiciona 55
    if (!numero.startsWith('55') && (numero.length === 10 || numero.length === 11)) {
        numero = '55' + numero;
    }
    
    // Adiciona o + no início
    return '+' + numero;
};

const call = async (token, para, texto, voz, velocidade, de, gravar, debug = false) => {
    const voiceMap = {
        0: 'br-Ricardo',
        1: 'br-Vitoria',
        2: 'en-Joey',
        3: 'rus-Maxim'
    };

    const speedMap = {
        1: 0.5,  // Muito lento
        2: 0.75, // Lento
        3: 1,    // Normal
        4: 1.5,  // Rápido
        5: 2     // Muito rápido
    };

    try {
        debugLog('\n🔍 Iniciando chamada:', debug);
        debugLog('   - Para: ' + para, debug);
        debugLog('   - De: ' + de, debug);
        debugLog('   - Voz: ' + voiceMap[voz], debug);
        debugLog('   - Velocidade: ' + speedMap[velocidade], debug);
        debugLog('   - Gravar: ' + (gravar ? 'Sim' : 'Não'), debug);
        debugLog('   - Mensagem: ' + texto, debug);

        const response = await axios.post('https://voice-api.zenvia.com/tts', {
            numero_destino: para,
            mensagem: texto,
            resposta_usuario: false,
            tipo_voz: voiceMap[voz],
            bina: de,
            gravar_audio: gravar,
            detecta_caixa: false,
            bina_inteligente: true,
            velocidade: speedMap[velocidade] || 1
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Token': token
            }
        });

        debugLog('✅ Chamada iniciada com sucesso!', debug);
        debugLog('   - ID: ' + response.data.dados?.id, debug);
        debugLog('   - Status: ' + response.data.status, debug);
        debugLog('   - Mensagem: ' + response.data.mensagem, debug);

        return {
            success: true,
            messageId: response.data.dados?.id,
            status: response.data.status,
            message: response.data.mensagem,
            number: para
        };
    } catch (error) {
        debugLog('❌ Erro na chamada:', debug);
        debugLog('   - Número: ' + para, debug);
        debugLog('   - Status: ' + error.response?.status, debug);
        debugLog('   - Mensagem: ' + (error.response?.data?.mensagem || error.message), debug);
        if (error.response?.data) {
            debugLog('   - Detalhes: ' + JSON.stringify(error.response.data, null, 2), debug);
        }

        return {
            success: false,
            error: error.response?.data?.mensagem || error.message,
            number: para,
            status: error.response?.status,
            details: error.response?.data
        };
    }
};

async function makeMultipleCalls(args) {
    const results = [];
    const totalCalls = args.quantidade;
    let currentCall = 0;

    // Faz as chamadas em sequência para o mesmo número
    for (let i = 0; i < args.quantidade; i++) {
        try {
            const result = await call(
                args.token || ZENVIA_TOKEN,
                args.para,
                args.texto,
                args.voz,
                args.velocidade,
                args.de,
                args.gravar,
                args.debug
            );
            results.push(result);
            currentCall++;
            if (args.onProgress) {
                args.onProgress(currentCall);
            }
        } catch (error) {
            results.push({
                success: false,
                number: args.para,
                error: error.message
            });
            currentCall++;
            if (args.onProgress) {
                args.onProgress(currentCall);
            }
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return results;
}

const makeCall = async (args) => {
    try {
        // Usa o token fornecido ou o do .env
        const token = args.token || process.env.ZENVIA_TOKEN;
        
        if (!token) {
            throw new Error('Token não encontrado. Configure ZENVIA_TOKEN no arquivo .env ou forneça um token via linha de comando');
        }

        const response = await axios.post(
            'https://voice-api.zenvia.com/tts',
            {
                numero_destino: args.para,
                mensagem: args.texto,
                resposta_usuario: false,
                tipo_voz: args.voz === 0 ? 'br-Ricardo' : 
                          args.voz === 1 ? 'br-Vitoria' : 
                          args.voz === 2 ? 'en-Joey' : 'rus-Maxim',
                bina: args.de,
                gravar_audio: args.gravar,
                bina_inteligente: true,
                velocidade: args.velocidade === 1 ? 0.5 :
                           args.velocidade === 2 ? 0.75 :
                           args.velocidade === 3 ? 1 :
                           args.velocidade === 4 ? 1.5 : 2
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Token': token
                }
            }
        );

        return {
            success: true,
            number: args.para,
            response: response.data
        };
    } catch (error) {
        throw new Error(error.response?.data?.mensagem || error.message);
    }
};

const cobranca = async (args) => {
    try {
        if (args.debug) {
            console.log('Debug: Argumentos recebidos:', args);
        }

        // Se um token foi fornecido, salva no .env
        if (args.token) {
            if (!/^[a-zA-Z0-9]{32}$/.test(args.token)) {
                throw new Error('Token inválido. O token da Zenvia deve ter 32 caracteres alfanuméricos.');
            }
            salvarToken(args.token);
        }

        return await makeMultipleCalls(args);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = cobranca;