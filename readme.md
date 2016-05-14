# gitlog
```git log``` の結果をjson形式で取得して使い易くする

## usage
### コマンドで使う
gitコマンドが使いたいディレクトリで以下を実行
```sh
git /path/to/gitlog/dir/bin/gitlog
```
jsonで表示される

git logのオプションはそのまま使える
```sh
git /path/to/gitlog/dir/bin/gitlog --author="naosim"
```

### jsから使う
```javascript
var gitlog = require('/path/to/gitlog/dir/');
gitlog([], (result) => {
  // do something
  console.log(result);
});
```
git logのオプションはそのまま使える
```javascript
var gitlog = require('/path/to/gitlog/dir/');
gitlog(['--author="naosim"'], (result) => {
  // do something
  console.log(result);
});
```
