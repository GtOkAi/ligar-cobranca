@echo off
cd /d "%~dp0"
chcp 65001 > nul
title Ligar Cobrança - Iniciando...
cls

echo ========================================================
echo        📞 Ligar Cobrança - Assistente de Início
echo ========================================================
echo(
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js não encontrado!
    echo(
    echo Para usar este programa, você precisa instalar o Node.js.
    echo Vou abrir o site oficial para você baixar e instalar.
    echo(
    echo 1. Baixe a versão "LTS" - Recomendado.
    echo 2. Instale - apenas vá clicando em Next/Próximo.
    echo 3. Depois de instalar, feche esta janela e abra novamente este arquivo.
    echo(
    pause
    start https://nodejs.org/
    exit
)

:: Verifica se as dependências já foram instaladas
if not exist "node_modules" (
    echo [!] Configurando o sistema pela primeira vez...
    echo     Isso pode levar alguns minutos dependendo da sua internet.
    echo(
    call npm install
    if %errorlevel% neq 0 (
        echo(
        echo [X] Ocorreu um erro ao instalar as dependências.
        echo     Verifique sua conexão com a internet.
        pause
        exit
    )
    echo(
    echo [V] Configuração concluída!
)

:: Garante que o build esteja atualizado
echo [!] Preparando o sistema...
call npm run build >nul 2>&1

:: Inicia o programa
cls
call npm start

pause