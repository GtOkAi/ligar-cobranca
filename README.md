# 📞 Ligar Cobrança

<p align="center">

![Ligar Cobrança](https://i.imgur.com/4K5Gn5O.png)

[![npm version](https://img.shields.io/npm/v/ligar-cobranca.svg?style=flat)](https://www.npmjs.com/package/ligar-cobranca)
[![license](https://img.shields.io/npm/l/ligar-cobranca.svg?style=flat)](https://github.com/gtokai/ligar-cobranca/blob/main/LICENSE)

Uma ferramenta CLI para fazer chamadas automáticas usando a API da Zenvia.
Após 7 anos, fiz uma atualização profunda devido a pedidos de suporte de pessoas com pouco ou nenhum conhecimento em programação.

Atualizei as dependências com falhas de segurança, o uso da API da TotalVoice que foi compradda pela ZENVIA e deixei de forma nativo o loop, além de outras melhorias.

[Instalação](#-instalação) • [Como Usar](#-como-usar) • [Exemplos](#-exemplos) • [Configuração](#-configuração)

</p>

## 🚀 Instalação

```bash
npm install -g ligar-cobranca
```

## ⚙️ Configuração

Você pode configurar a ferramenta de duas maneiras:

### 1. Usando o Assistente (Recomendado)
Na primeira vez que você executar a ferramenta, ela irá guiá-lo através de um assistente interativo que ajudará você a configurar o token e o número de origem. Basta executar:

```bash
ligar-cobranca
```

E seguir as instruções na tela.

### 2. Configuração Manual
Se preferir, você pode criar manualmente um arquivo `.env` na raiz do projeto:

```env
ZENVIA_TOKEN=seu_token_aqui
ZENVIA_PHONE_NUMBER=seu_numero_de_origem
```

Para obter seu token, acesse [https://app.zenvia.com/](https://app.zenvia.com/)

## 🎯 Como Usar

### Modo Interativo
```bash
ligar-cobranca
```

O modo interativo é perfeito para quem não está familiarizado com comandos de linha. Ele guia você passo a passo através de um assistente amigável:

1. **Token da Zenvia**: Digite seu token ou pressione Enter se já estiver configurado
2. **Tipo de Chamada**: Escolha entre chamada única ou múltipla
3. **Número de Destino**: Digite o número no formato internacional (ex: +5511999999999)
4. **Número de Origem**: Opcional, digite ou pressione Enter para usar o padrão
5. **Mensagem**: Escolha entre mensagem padrão ou digite uma personalizada
6. **Voz**: Selecione uma das 4 vozes disponíveis
7. **Velocidade**: Escolha entre 5 níveis de velocidade
8. **Gravar**: Decida se deseja gravar a chamada
9. **Quantidade**: Defina quantas chamadas deseja fazer (1-999)
10. **Debug**: Ative o modo debug se precisar de mais informações

Cada opção é apresentada de forma clara e intuitiva, com menus de seleção quando apropriado.

### Modo CLI
```bash
ligar-cobranca --para=NUMERO_DESTINO [opções]
```

## 📋 Opções

| Opção | Descrição | Padrão |
|-------|-----------|---------|
| `--para` | Número de destino | - |
| `--numeros` | Números de destino (separados por vírgula) | - |
| `--de` | Número de origem | ZENVIA_PHONE_NUMBER do .env |
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

### Velocidades
- `1` - Muito lento (0.5x)
- `2` - Lento (0.75x)
- `3` - Normal (1x)
- `4` - Rápido (1.5x)
- `5` - Muito rápido (2x)

## 💡 Exemplos

### Chamada Única
```bash
ligar-cobranca --para=+5511999999999 --voz=0 --velocidade=3 --gravar
```

### Múltiplas Chamadas
```bash
ligar-cobranca --numeros=+5511999999999,+5511888888888 --quantidade=5
```

### Chamada com Mensagem Personalizada
```bash
ligar-cobranca --para=+5511999999999 --texto="Olá, isso é um teste" --voz=1
```

### Chamada com Gravação
```bash
ligar-cobranca --para=+5511999999999 --texto="Olá" --gravar
```

### Modo Debug
```bash
ligar-cobranca --para=+5511999999999 --debug
```

## ⚠️ Importante

- O número de origem (`--de`) deve estar no formato internacional (ex: +5511999999999)
- Para múltiplas chamadas, forneça pelo menos 2 números
- A quantidade de chamadas deve estar entre 1 e 999
- O token da Zenvia deve ter 32 caracteres alfanuméricos
- A gravação de chamadas está disponível apenas no painel de controle da Zenvia
- Suporte completo para números internacionais (formato: +55DDDNUMERO)

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

