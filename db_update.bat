set servername="DESKTOP-IHCMDJ6"
set dbname="ibdb"
set username="sa"
set pass="3841327"
echo %pass%
for /r %%i in (..\db\*) do sqlcmd -S %servername% -d %dbname% -U %username% -P %pass% -i %%i
pause
