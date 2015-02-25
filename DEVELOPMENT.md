<!--
// #############################################################################
-->

# Dev set up

Get the repo
```bash
$ git clone https://github.com/mattbrun/cows.git
$ cd cows
$ git config user.email "zzz@zzz.zzz"
$ git config user.name yyy
```


Install all libs and deps:
```bash
$ ./install.sh
```


# OpenShift deployment

https://www.openshift.com/blogs/introduction-to-deployments-and-rollbacks-on-openshift

```bash
$ rhc app create boom nodejs-0.10 mongodb-2.4 -r boom-openshift
$ cd boom-openshift
```

```bash
$ git remote add openshift openshift-repo
$ git push -f openshift feature/derby-0.6:master    # Per pushare un branch locale diverso da master sul master remoto
$ git push -f openshift develop:master    # Per pushare un branch locale diverso da master sul master remoto
```

- Nell'app NodeJS è necessario fare il bind del server sia sulla porta che sull'IP fornito tramite l'environment


# Running 

Create public and server libs using source
```bash
$ ./start.sh
```

Create public and server libs and minify (publish)
```bash
$ ./start.sh bundle
```


# Debugging

```bash
$ NODE_ENV=production node-theseus [--theseus-verbose=2] server.js
```


# Working on 3rd party modules
- Forke the module on github, i.e. derby-login
```bash
$ cd node_modules
$ git clone https://github.com/mattbrun/derby-login.git
$ cd derby-login
$ git remote add upstream https://github.com/derbyparty/derby-login.git
$ git remote -v
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
```


# Cleaning OpenShift app fs

```bash
$ rhc app tidy -a b
$ rhc ssh -a b
  $ quota -s
  $ npm cache clear
  $ find . -type d -name "node_modules" | less
  $ rm -rf ./app-root/runtime/repo/node_modules/ ./app-deployments/XXXXXXXXX/repo/node_modules
```
