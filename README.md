# 📞 Ligar Cobrança

<p align="center">

![Ligar Cobrança](https://i.imgur.com/4K5Gn5O.png)

[![npm version](https://img.shields.io/npm/v/ligar-cobranca.svg?style=flat)](https://www.npmjs.com/package/ligar-cobranca)
[![license](https://img.shields.io/npm/l/ligar-cobranca.svg?style=flat)](https://github.com/gtokai/ligar-cobranca/blob/main/LICENSE)

Uma ferramenta CLI para fazer chamadas automáticas usando APIs de voz (Zenvia e Twilio).
Após 7 anos, fiz uma atualização profunda devido a pedidos de suporte de pessoas com pouco ou nenhum conhecimento em programação.

Atualizei as dependências com falhas de segurança, o uso da API da TotalVoice que foi comprada pela ZENVIA, adicionei suporte à API da Twilio e deixei de forma nativa o loop, além de outras melhorias.

[Instalação](#-instalação) • [Como Usar](#-como-usar) • [Exemplos](#-exemplos) • [Configuração](#-configuração)

</p>

## 🚀 Instalação e Uso (Modo Fácil)

Para quem não tem conhecimento técnico, criei um arquivo automático.

1. Baixe e instale o [Node.js](https://nodejs.org/) (versão LTS).
2. Baixe este projeto (clique em Code > Download ZIP e extraia a pasta).
3. Dentro da pasta, dê um duplo clique no arquivo **`iniciar.bat`**.

O sistema irá configurar tudo automaticamente na primeira vez e abrir o menu.

## 🚀 Instalação (Modo Desenvolvedor)

```bash
npm install -g ligar-cobranca
```

## 💻 Desenvolvimento

Para rodar o projeto localmente (sem instalar globalmente):

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Execute em modo de desenvolvimento (com auto-reload):
```bash
npm run dev
```
4. Ou execute o build e rode:
```bash
npm run build
npm start
```

## ⚙️ Configuração

Você pode configurar a ferramenta de duas maneiras:

### 1. Usando o Assistente (Recomendado)
Na primeira vez que você executar a ferramenta, ela irá guiá-lo através de um assistente interativo que ajudará você a escolher o provedor e configurar as credenciais. Basta executar:

```bash
ligar-cobranca
```

E seguir as instruções na tela.

### 2. Configuração Manual
Se preferir, você pode criar manualmente um arquivo `.env` na raiz do projeto.

**Para Zenvia:**
```env
ZENVIA_TOKEN=seu_token_aqui
ZENVIA_PHONE_NUMBER=seu_numero_de_origem
```

**Para Twilio:**
```env
TWILIO_ACCOUNT_SID=seu_account_sid
TWILIO_AUTH_TOKEN=seu_auth_token
TWILIO_FROM=seu_numero_twilio_ou_verificado
```

## 🎯 Como Usar

### Modo Interativo
```bash
ligar-cobranca
```

O modo interativo é perfeito para quem não está familiarizado com comandos de linha. Ele guia você passo a passo através de um assistente amigável:

1. **Provedor**: Escolha entre Zenvia ou Twilio
2. **Credenciais**: Insira o token (Zenvia) ou as credenciais serão lidas do .env (Twilio)
3. **Tipo de Chamada**: Escolha entre chamada única ou múltipla
4. **Número de Destino**: Digite o número no formato internacional (ex: +5511999999999)
5. **Número de Origem**: Opcional, digite ou pressione Enter para usar o padrão configurado
6. **Mensagem**: Escolha entre mensagem padrão ou digite uma personalizada
7. **Voz**: Selecione uma das 4 vozes disponíveis
8. **Velocidade**: Escolha entre 5 níveis de velocidade
9. **Gravar**: Decida se deseja gravar a chamada
10. **Quantidade**: Defina quantas chamadas deseja fazer (1-999)
11. **Debug**: Ative o modo debug se precisar de mais informações

### Modo CLI
```bash
ligar-cobranca --para=NUMERO_DESTINO [opções]
```

## 📋 Opções

| Opção | Descrição | Padrão |
|-------|-----------|---------|
| `--provider` | Provedor de API (`zenvia` ou `twilio`) | `zenvia` (se não detectado auto) |
| `--para` | Número de destino | - |
| `--numeros` | Números de destino (separados por vírgula) | - |
| `--de` | Número de origem | Do .env conforme provedor |
| `--texto` | Mensagem para ser convertida em voz | "Alô? Alô? Alô? Alô? Alô?" |
| `--voz` | Voz a ser utilizada | 0 (Ricardo) |
| `--velocidade` | Velocidade da voz (1-5) | 3 (Normal) |
| `--gravar` | Gravar a chamada | false |
| `--quantidade` | Quantidade de chamadas (1-999) | 1 |
| `--debug` | Ativar modo debug | false |

### Vozes Disponíveis
- `0` - Ricardo (BR)
- `1` - Vitória (BR)
- `2` - Joey (EN)
- `3` - Maxim (RUS)

> **Nota para Twilio:** Temporariamente, todas as vozes podem ser redirecionadas para uma voz padrão ("Alice") para garantir compatibilidade em contas Trial ou que não tenham o Amazon Polly ativado.

### Velocidades
- `1` - Muito lento (0.5x)
- `2` - Lento (0.75x)
- `3` - Normal (1x)
- `4` - Rápido (1.5x)
- `5` - Muito rápido (2x)

## 💡 Exemplos

### Chamada Única (Zenvia)
```bash
ligar-cobranca --provider=zenvia --para=+5511999999999 --voz=0
```

### Chamada Única (Twilio)
```bash
ligar-cobranca --provider=twilio --para=+5511999999999 --texto="Teste Twilio"
```

### Múltiplas Chamadas
```bash
ligar-cobranca --numeros=+5511999999999,+5511888888888 --quantidade=5
```

### Chamada com Mensagem Personalizada
```bash
ligar-cobranca --para=+5511999999999 --texto="Olá, isso é um teste" --voz=1
```

### Modo Debug
```bash
ligar-cobranca --para=+5511999999999 --debug
```

## ⚠️ Importante

- O número de origem (`--de`) deve estar no formato internacional (ex: +5511999999999)
- Para Twilio, certifique-se de ter `TWILIO_ACCOUNT_SID` e `TWILIO_AUTH_TOKEN` no `.env`
- **Twilio**: O número de origem (`TWILIO_FROM` ou `--de`) deve ser verificado na sua conta Twilio ou comprado nela. Caso contrário, a chamada falhará com erro 21210.
- **Zenvia**: O número de origem (`ZENVIA_PHONE_NUMBER` ou `--de`) deve ser um número válido e autorizado na sua conta Zenvia. Se usar um número aleatório, a chamada pode falhar (Erro de BINA).
- Para múltiplas chamadas, forneça pelo menos 2 números
- A quantidade de chamadas deve estar entre 1 e 999
- A gravação de chamadas depende do suporte da API escolhida
- Suporte completo para números internacionais (formato: +55DDDNUMERO)
- **Ciclo da Chamada**: O sistema é programado para encerrar a ligação automaticamente após o término da mensagem de áudio.
- **Contas Trial (Twilio)**:
  - **Limitação de Texto**: Em contas Trial, a Twilio pode bloquear o texto personalizado e tocar apenas a mensagem padrão "You have a trial account...". Para que o texto personalizado funcione corretamente, talvez seja necessário fazer o upgrade da conta.

## 🔍 Modo Debug

Use a opção `--debug` para ver logs detalhados do processo, incluindo:
- Detalhes da requisição à API
- Resposta do servidor
- Informações de progresso
- Erros detalhados (se houver)

```bash
ligar-cobranca --para=+5511999999999 --debug
```

## 📝 Licença

MIT

---

<p align="center">

**⚠️ Aviso Legal**

Não sou responsável pelo uso que você faz desta ferramenta. Use com responsabilidade e de acordo com as leis locais.

</p>
