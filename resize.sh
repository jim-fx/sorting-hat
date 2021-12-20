getConf(){
  cat squoosh.config.json | jq ".$1" | tr -d '\n '
}

npx @squoosh/cli -d static/textures --resize $(getConf "resize") --quant $(getConf "quant") --mozjpeg $(getConf "mozjpeg") static/**/*.png
npx @squoosh/cli -d static --webp $(getConf "webp") static/*.png

