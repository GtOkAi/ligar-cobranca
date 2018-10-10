# Ligar cobrança

**Aplicativo disponível para:**

- Android: [Google Play](https://play.google.com/store/apps/details?id=io.ligarcobranca.gtokai)
- iOS: *versão iOS está em validação*  

Não tenho responsabilidade sobre o uso da ferramenta e não tenho qualquer ligação com a [Total Voice](http://totalvoice.com.br).

## Para usar:

1. Se cadastre no http://totalvoice.com.br (os créditos para ligar não são de graça, mas são baratos).
2. Pegue seu token.
3. Instale o pacote usando: `npm install ligar-cobranca -g`.
4. use o comando: `ligar-cobranca --de=<NUMERO> --para=<NUMERO> --token=<TOKEN> [--tipo=<TIPO>]` (tipo opcional).

### Parâmetros

| Parâmetro | Obrigatório        | Descrição                                                                                    |
|-----------|--------------------|----------------------------------------------------------------------------------------------|
| `--token` | :white_check_mark: | Seu token de acesso do TotalVoice                                                            |
| `--de`    | :white_check_mark: | Quem está se defendendo.                                                                     |
| `--para`  | :white_check_mark: | Número da empresa de cobrança.                                                               |
| `--tipo`  | :x:                | Você poderá usar o argumento `--tipo` para mudar a fala padrão "Alô? Alô? Alô? Alô? [...]".  |
| `--mp3`   | :x:                | Você poderá usar o argumento `--mp3` para executar um arquivo de som a partir de uma url".   |
| `--texto` | :x:                | Use o argumento `--texto` com "", para definir um novo texto a ser convertido em voz.        |
| `--voz`   | :x:                | Combinado com o argumento `--texto` use para trocar a voz. 0 = Masculina, 1 = Feminina       |


#### `--tipo`

- Default (sem usar o `--tipo`) - "Alô? Alô? Alô? Alô? Alô? [...]".
- `0`: Aleatório  
- `1`: "Vocês já estão bravos? Não? Então espera ai."  
- `2`: "Alô? Alô? Alô? Oi, está me ouvindo? Então espera ai que já te ligo de novo."  
- `3`: "Você irá receber ligações infinitamente, até que pare de ligar no meu número"  
- `4`: "Esse é meu jeito de viver, ninguém nunca foi igual, a minha vida é fazer, o bem vencer o mal, pelo mundo viajarei tentando encontrar, o pokemon e com o seu poder tudo transformar"  
- `5`: "Olá, tudo bem? Parece que o jogo virou, não é mesmo? Vou te ligar repetidamente, igual vocês fazem comigo"  
  
A idéia é criar (ou mesmo alterar os atuais) novos sons para se adaptar melhor em outras situações.  
  
#### `--texto` e `--voz`  
  
Caso nenhuma das falas padrões do argumento `--tipo` tenha te agradado, você poderá usar o argumento `--texto` para definir o que será falado, junto com o argumento `--voz`.

- `0` (Default): Masculina (br-Ricardo)  
- `1`: Feminina (br-Vitoria)

Exemplo de uso:  
  
`ligar-cobranca --de=1199999999 --para=1199999999 --token=134df8d2a0ab3df07c42f088c9a2e5e1 --texto="Olá, essa é uma mensagem de teste usando a voz da Vitoria" --voz=1`  
  
#### `--mp3`  
  
Para executar um arquivo mp3, use o argumento `--mp3` com uma url direta para o arquivo de som.  
Exemplo de uso:  
  
`ligar-cobranca --de=1199999999 --para=1199999999 --token=134df8d2a0ab3df07c42f088c9a2e5e1 --mp3=http://8balls.com.br/sejavip2/alo.mp3`  
  
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

Após isto dê permissão e dentro do diretório rode `chmod +x vinganca.sh && ./vinganca.sh`. <3


Divirta-se.

> Baseado nesse [projeto](https://github.com/haskellcamargo/gemidao-do-zap).  

