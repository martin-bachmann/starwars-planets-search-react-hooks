### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'publisher.sh' fornecido 
## pela Trybe. 

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path trybe.yml \
    --path trybe-filter-repo.sh \
    --path req-1.png \
    --path req-2.gif \
    --path req-3.gif \
    --path req-4.gif \
    --path req-5.gif \
    --path req-6.gif \
    --path req-7.gif \
    --path projectIntro.gif \
    --path only-all-green.png \
    --path only-one-green.png \
    --path describe-only.png \
    --path it-only.png \
    --path src/App.test.js \
    --path README.md \
    --invert-paths --force
