English | [中文版][readm-cn]

# Yangshan

Website: [http://211.159.183.230](http://211.159.183.230)

## Development

```zsh
git clone https://github.com/zhuyudong/yangshan.git

cd yangshan
yarn
yarn dev
```

Start `webpack` server

```zsh
yarn dev
```

**Next**, your show time.

Open url http://127.0.0.1:8080/ in browser.

[readm-cn]: https://github.com/zhuyudong/yangshan/blob/master/README.zh-CN.md

## Docker

```bash
cd docker
docker-compose rm && docker-compose pull && docker-compose build --no-cache && docker-compose up -d --force-recreate
```
