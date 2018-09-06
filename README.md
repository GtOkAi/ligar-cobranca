# Ligar cobrança

Não tenho responsabilidade sobre o uso da ferramenta e não tenho qualquer ligação com a Total Voice.

> Baseado no [gemidao-do-zap](https://github.com/haskellcamargo/gemidao-do-zap).  

## Para usar:

1. Se cadastre no http://totalvoice.com.br (os créditos para ligar não são de graça, mas são baratos);
2. Pegue seu token;
3. Instale o pacote usando: `npm install ligar-cobranca -g`;
4. use o comando: `ligar-cobranca --de=<NUMERO> --para=<NUMERO> --token=<TOKEN> [--tipo=<TIPO>]` (tipo opcional).

### Parâmetros

| Parâmetro | Obrigatório        | Descrição                                                                                    |
|-----------|--------------------|----------------------------------------------------------------------------------------------|
| `--token` | :white_check_mark: | Seu token de acesso do TotalVoice                                                            |
| `--de`    | :white_check_mark: | Quem está se defendendo.                                                                     |
| `--para`  | :white_check_mark: | Número da empresa de cobrança.                                                               |
| `--tipo`  |                    | Você poderá usar o argumento `--tipo` para mudar a fala padrão "Alô? Alô? Alô? Alô? [...]".  |

#### `--tipo`

- Default (sem usar o `--tipo`) - "Alô? Alô? Alô? Alô? Alô? [...]".
- `0`: Aleatório  
- `1`: "Vocês já estão bravos? Não? Então espera ai."  
- `2`: "Alô? Alô? Alô? Oi, está me ouvindo? Então espera ai que já te ligo de novo."  
- `3`: "Você irá receber ligações infinitamente, até que pare de ligar no meu número"  
- `4`: "Esse é meu jeito de viver, ninguém nunca foi igual, a minha vida é fazer, o bem vencer o mal, pelo mundo viajarei tentando encontrar, o pokemon e com o seu poder tudo transformar"  
- `5`: "Olá, tudo bem? Parece que o jogo virou, não é mesmo? Vou te ligar repetidamente, igual vocês fazem comigo"  

A idéia é criar (ou mesmo alterar os atuais) novos sons para se adaptar melhor em outras situações.  

### Dica de Uso (Windows)  
  
Crie um arquivo `npm.bat` (exemplo) com a linha `ligar-cobranca --de=<NUMERO> --para=<NUMERO> --token=TOKEN` e depois crie um segundo `.bat` com o código:

```
:loop
call npm.bat
 sleep 60
 goto loop
pause
```
Execute o segundo .bat criado e ele irá fazer as ligações em loop.  


### Dica de Uso (Unix likes)

Crie um arquivo `vinganca.sh` com o código:
```shell
#!/usr/bin/bash
# heuehuuee, o melhor projeto do mundo esse <3

while true
do
        # Acrescente aqui seus dados
        ligar-cobranca --de=<NUMERO> --para=<NUMERO> --token=TOKEN
        sleep 60
done
```
Após dê permissão, dentro do diretório rode `chmod +x vinganca.sh && ./vinganca.sh` <3


Divirta-se.
