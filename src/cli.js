#!/usr/bin/env node
'use strict';

require('dotenv').config();

var _yargs = require('yargs');
var _yargs2 = _interopRequireDefault(_yargs);
var _safe = require('colors/safe');
var _ramda = require('ramda');
var _cobranca = require('./cobranca');
var _cobranca2 = _interopRequireDefault(_cobranca);
var inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const title = boxen(
    chalk.bold.blue('Ligar Cobrança') + '\n' +
    chalk.gray('Uma ferramenta para fazer chamadas automáticas usando APIs de voz (Zenvia, Twilio)'),
    {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue'
    }
);

const emitSuccess = function emitSuccess(message) {
    return console.log(chalk.green(' ✓ ' + message));
};

const emitError = function emitError(message) {
    return console.log(chalk.red(' ✗ ' + message));
};

const emitInfo = function emitInfo(message) {
    return console.log(chalk.blue(' ℹ ' + message));
};

const voices = [
    { name: chalk.cyan('Ricardo') + ' (Português BR - Masculino)', value: 0 },
    { name: chalk.magenta('Vitória') + ' (Português BR - Feminino)', value: 1 },
    { name: chalk.yellow('Joey') + ' (Inglês - Masculino)', value: 2 },
    { name: chalk.green('Maxim') + ' (Russo - Masculino)', value: 3 }
];

const defaultTexts = [
    { name: chalk.cyan('Alô? Alô? Alô? Alô? Alô?'), value: 'Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô?' },
    { name: chalk.gray('Personalizado'), value: 'custom' }
];

const interactiveMode = async () => {
    console.log(boxen(chalk.blue(`
LIGAR-COBRANÇA
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣶⣶⣶⣶⣶⣦⣤⣶⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⡿⠛⠋⠉⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠻⢿⣶⣦⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠟⣯⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⢿⣷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣧⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠙⠻⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣤⣄⠀⠀⠀⠀⠀⠀⠉⠙⠛⠻⣿⡿⣿⣶⣶⣦⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⠀⠀⠀⠀⠀⠀⠈⠻⣿⣄⠀⠀⠀⠀⠀⠀⠀
⠀⢀⣠⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⠃⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣧⡀⠀⠀⠀⠀⠀
⢰⣿⣿⣿⣗⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣄⠀⠀⠀⠀
⠀⠉⠉⢹⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣄⠀⠀⠀
⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⣸⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⡄⠀⠀
⠀⠀⠀⠀⣿⣇⠀⠀⠀⠀⠀⢠⣾⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⠀⠀
⠀⠀⠀⠀⢹⣿⡀⠀⠀⠀⣠⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣇⠀
⠀⠀⠀⠀⠀⢿⣧⠀⢀⣾⣿⢃⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀
⠀⠀⠀⠀⠀⠘⣿⣤⣾⡿⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡆
⠀⠀⠀⠀⠀⠀⠙⠟⠋⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣧
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿  

Não sou responsável pelo uso que você faz da ferramenta! Divirta-se!
`), {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue'
    }));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'provider',
            message: 'Selecione o provedor de API:',
            choices: [
                { name: 'Zenvia', value: 'zenvia' },
                { name: 'Twilio', value: 'twilio' }
            ],
            default: 'zenvia'
        },
        {
            type: 'input',
            name: 'token',
            message: 'Digite seu token da Zenvia (ou pressione Enter se já estiver configurado no .env):',
            when: answers => answers.provider === 'zenvia',
            validate: (input) => {
                if (!input) return true; // Permite vazio se já estiver no .env
                if (!/^[a-zA-Z0-9]{32}$/.test(input)) {
                    return 'Token inválido. O token da Zenvia deve ter 32 caracteres alfanuméricos.';
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'tipo',
            message: 'Tipo de chamada:',
            choices: [
                { name: '1 - Chamada única', value: 1 },
                { name: '2 - Chamadas múltiplas', value: 2 }
            ],
            default: 1
        },
        {
            type: 'input',
            name: 'para',
            message: 'Número de destino:',
            validate: input => {
                if (!input) return 'Por favor, insira um número';
                if (!/^\+?[0-9]{10,15}$/.test(input.replace(/\D/g, ''))) {
                    return 'Número inválido. Use o formato: +5511999999999';
                }
                return true;
            },
            when: answers => answers.tipo === 1
        },
        {
            type: 'input',
            name: 'numeros',
            message: 'Números de destino (separados por vírgula):',
            validate: input => {
                if (!input) return 'Por favor, insira pelo menos um número';
                const numeros = input.split(',').map(n => n.trim().replace(/\D/g, ''));
                if (numeros.length < 2) return 'Insira pelo menos 2 números';
                for (const numero of numeros) {
                    if (!/^[0-9]{10,15}$/.test(numero)) {
                        return 'Número inválido. Use o formato: 5511999999999';
                    }
                }
                return true;
            },
            filter: input => {
                if (!input) return '';
                // Remove espaços extras e caracteres não numéricos
                const numeros = input.split(',').map(n => n.trim().replace(/\D/g, ''));
                return numeros.join(',');
            },
            when: answers => answers.tipo === 2
        },
        {
            type: 'input',
            name: 'de',
            message: 'Número de origem (opcional):',
            default: (answers) => {
                if (answers.provider === 'twilio') {
                    return process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_FROM || '';
                }
                return process.env.ZENVIA_PHONE_NUMBER || '';
            },
            validate: input => {
                if (!input) return true;
                if (!/^\+?[0-9]{10,15}$/.test(input.replace(/\D/g, ''))) {
                    return 'Número inválido. Use o formato: +5511999999999';
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'tipoMensagem',
            message: 'Mensagem:',
            choices: [
                { name: '1 - Mensagem padrão', value: 'padrao' },
                { name: '2 - Mensagem personalizada', value: 'custom' }
            ],
            default: 0
        },
        {
            type: 'input',
            name: 'texto',
            message: 'Digite sua mensagem:',
            when: answers => answers.tipoMensagem === 'custom'
        },
        {
            type: 'list',
            name: 'voz',
            message: 'Voz:',
            choices: [
                { name: '1 - Ricardo (BR)', value: 0 },
                { name: '2 - Vitória (BR)', value: 1 },
                { name: '3 - Joey (EN)', value: 2 },
                { name: '4 - Maxim (RUS)', value: 3 }
            ],
            default: 0
        },
        {
            type: 'list',
            name: 'velocidade',
            message: 'Velocidade da voz:',
            choices: [
                { name: '1 - Muito lento', value: 1 },
                { name: '2 - Lento', value: 2 },
                { name: '3 - Normal', value: 3 },
                { name: '4 - Rápido', value: 4 },
                { name: '5 - Muito rápido', value: 5 }
            ],
            default: 3
        },
        {
            type: 'confirm',
            name: 'gravar',
            message: 'Gravar chamada?',
            default: false
        },
        {
            type: 'input',
            name: 'quantidade',
            message: 'Quantidade de chamadas:',
            default: '1',
            validate: input => {
                const num = parseInt(input);
                if (isNaN(num) || num < 1 || num > 999) {
                    return 'Por favor, insira um número entre 1 e 999';
                }
                return true;
            }
        },
        {
            type: 'confirm',
            name: 'debug',
            message: 'Ativar modo debug?',
            default: false
        }
    ]);

    return {
        provider: answers.provider,
        token: answers.token || undefined,
        para: answers.para,
        numeros: answers.tipo === 2 ? (answers.numeros || '').split(',').map(n => n.trim().replace(/\D/g, '')) : null,
        de: answers.de,
        texto: answers.tipoMensagem === 'custom' ? answers.texto : 'Alô? Alô? Alô? Alô? Alô?',
        voz: parseInt(answers.voz),
        velocidade: parseInt(answers.velocidade),
        gravar: answers.gravar,
        quantidade: parseInt(answers.quantidade),
        debug: answers.debug
    };
};

const cli = async () => {
    try {
        const argv = _yargs2.default
            .usage('Uso: $0 [opções]')
            .option('provider', {
                alias: 'P',
                description: 'Provedor de API (zenvia ou twilio)',
                type: 'string',
                choices: ['zenvia', 'twilio']
            })
            .option('para', {
                alias: 'p',
                description: 'Número de destino',
                type: 'string'
            })
            .option('numeros', {
                alias: 'n',
                description: 'Números de destino (separados por vírgula)',
                type: 'array'
            })
            .option('de', {
                alias: 'd',
                description: 'Número de origem',
                type: 'string'
            })
            .option('texto', {
                alias: 't',
                description: 'Mensagem para ser convertida em voz',
                type: 'string'
            })
            .option('voz', {
                alias: 'v',
                description: 'Voz a ser utilizada (0-3)',
                type: 'number',
                default: 0
            })
            .option('velocidade', {
                alias: 's',
                description: 'Velocidade da voz (1-5)',
                type: 'number',
                default: 3
            })
            .option('gravar', {
                alias: 'g',
                description: 'Gravar a chamada',
                type: 'boolean',
                default: false
            })
            .option('quantidade', {
                alias: 'q',
                description: 'Quantidade de chamadas (1-999)',
                type: 'number',
                default: 1
            })
            .option('debug', {
                description: 'Ativar modo debug',
                type: 'boolean',
                default: false
            })
            .help('h')
            .alias('h', 'help')
            .argv;

        let args;
        if (argv.para || argv.numeros) {
            args = argv;
        } else {
            args = await interactiveMode();
        }

        // Função para executar as chamadas
        const executarChamadas = async () => {
            const totalChamadas = args.quantidade * (args.numeros ? args.numeros.length : 1);
            let currentCall = 0;

            // Atualiza o progresso a cada chamada
            const updateProgress = (current) => {
                currentCall = current;
                process.stdout.write(`\r\x1b[K`); // Limpa a linha atual
                process.stdout.write(`Efetuando ligações (${current}/${totalChamadas})...`);
            };

            // Adiciona o callback de progresso aos argumentos
            args.onProgress = updateProgress;

            const results = await _cobranca2.default(args);
            
            // Limpa a linha do progresso
            process.stdout.write(`\r\x1b[K`); // Limpa a linha atual

            // Exibe o resumo das chamadas
            const sucessos = results.filter(r => r.success).length;
            const falhas = results.filter(r => !r.success);
            
            const sucessosFormatados = sucessos.toString().padStart(2, '0');
            const falhasFormatadas = falhas.length.toString().padStart(2, '0');

            console.log(boxen(
                chalk.green(`✓ Chamadas iniciadas: ${sucessosFormatados}`) + '\n' +
                chalk.red(`✗ Falhas no envio:    ${falhasFormatadas}`) + '\n\n' +
                chalk.gray('Nota: O telefone pode levar alguns segundos para tocar.'),
                {
                    padding: 1,
                    margin: 1,
                    borderStyle: 'round',
                    borderColor: falhas.length > 0 ? 'red' : 'green',
                    title: 'Relatório de Envio',
                    titleAlignment: 'center'
                }
            ));

            if (falhas.length > 0) {
                console.log(chalk.red('\nDetalhes das falhas:'));
                falhas.forEach(f => {
                    console.log(chalk.red(`• ${f.number || 'Desconhecido'}: ${f.error}`));
                });
                console.log(''); // Linha em branco
            }

            return results;
        };

        // Executa as chamadas iniciais
        await executarChamadas();

        // Loop principal
        while (true) {
            const { acao } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'acao',
                    message: 'O que você deseja fazer?',
                    choices: [
                        { name: '1 - Executar novamente com as mesmas configurações', value: 'repetir' },
                        { name: '2 - Reiniciar com novas configurações', value: 'reiniciar' },
                        { name: '3 - Sair', value: 'sair' }
                    ],
                    default: 0
                }
            ]);

            if (acao === 'sair') {
                console.log('\n👋 Até logo!');
                break;
            } else if (acao === 'reiniciar') {
                console.log('\n🔄 Reiniciando com novas configurações...\n');
                // Força o modo interativo para coletar novas configurações
                args = await interactiveMode();
                await executarChamadas();
                // Não fazemos break aqui para manter o loop rodando com as novas configurações
            } else if (acao === 'repetir') {
                console.log('\n🔄 Executando novamente...\n');
                await executarChamadas();
            }
        }

    } catch (error) {
        console.error(chalk.red('❌ Erro:'), error.message);
        process.exit(1);
    }
};

cli();