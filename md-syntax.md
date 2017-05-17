# Git使用手册

* **SVN的做法缺点：**
	* SVN copy分支之后，其他人的改动对A不可见，需要要经过复杂的合并流程；
	* 如果要开切回主分支进行开发，则要管理两份代码，开两个IDE，容易出错；
	* 代码n份，版本库存压力大；
	* 最后合并复杂度高，需要借助diff工具，复杂的合并流程；
		* SVN copy分支之后，其他人的改动对A不可见，需要要经过复杂的合并流程；
		* 如果要开切回主分支进行开发，则要管理两份代码，开两个IDE，容易出错；
		* 代码n份，版本库存压力大；
		* 最后合并复杂度高，需要借助diff工具，复杂的合并流程；


 Git            | SVN
----------------|----------------
分布式版本控制    | 集中式版本控制
分支管理更加简便  | 分支其实就是copy


* Git是分布式版本控制软件，每一个Clone都是一个完整的版本库，“中心”数据丢失可以根据Clone版本进行还原；
* Git支持离线操作，当“中心”宕机也能够很好地支持离线操作（对本地库进行操作）；
* Git实际上是二级提交，先Commit到本地库，在从本地库Push同步到远程服务器；
* Git创建/创建/合并分支十分简便，对基于**分支开发**，**分支发布**十分友好。（例如开发大而全的系统时，想提交/同步代码，又不想影响现有代码，待开发完后再合并，就可以创建分支）；
* Git对快速迭代式开发十分友好（例如A团队继续开发线上的1.0版本，B团队开发基于1.0的2.0版本）；

**SVN提交示意图**
![SVN提交示意图](images/diff_svn.jpg)

**Git提交示意图**
![Git提交示意图](images/diff_git.jpg)

## 2.安装软件：

* Git（Git安装包，类比SVN）：https://git-scm.com/downloads
* SmartGit（Git图形化工具，类比TortoiseSVN）：http://www.syntevo.com/smartgit/
* 内网下载：

## 3.Git基本操作

在所有操作之前，需谨记一点：Git分为**远程仓库**，**本地仓库**和**工作空间**，（而SVN可以理解为只有**远程仓库**和**工作空间**）。非要在文件目录进行对应的话，可以理解为：

* 远程仓库：远程服务器的仓库；
* 本地仓库：仓库目录的.git目录；
* 工作空间：仓库所在的除.git目录以外的目录和文件；

### 3.1.获取：clone、checkout、fetch、pull

#### 3.1.1.clone：克隆项目，类似与SVN的检出（checkout）

克隆远程仓库的默认分支到本地空间。

```bash
git clone http://10.61.20.200:3000/EOMP/Projects.git
```

#### 3.1.2.checkout：切换分支/从本地仓库更新工作空间

`clone`之后，git会使用默认的分支，我们项目默认分支是developer，还有一个是发布分支master，切换到master分支的命令为：

```bash
zenggt@KJ-ZENGGT-1293 MINGW64 /e/EOMP-Git/Projects (developer)
$ git checkout master
Switched to a new branch 'master'
Branch master set up to track remote branch master from origin.

zenggt@KJ-ZENGGT-1293 MINGW64 /e/EOMP-Git/Projects (master)
```
#### 3.1.3.fetch：从远程仓库更新到本地仓库（不更新工作空间）

```bash
git fetch
```

#### 3.1.3.pull：从远程仓库更新到工作空间，并进行merge合并（与SVN的update类似）

当拉取合并过程中，有文件冲突，则会中止合并，在解决冲突文件之后，再继续进行合并。

```bash
git pull
```

需要注意的是，pull的时候，不允许工作目录有未提交的修改。

这样做的主要目的是为了防止远程文件直接覆盖了本地修改，通过commit或者stash可以将覆盖的文件很好地进行还原，而不用像SVN一个个解决冲突。

最优的做法，就是在`pull`之前，不管以后内容要不要，先`commit`到本地，再进行`pull`。只要`commit`之后，只要本地库不删除，内容都可以恢复回来。

### 3.2.提交：add、commit、push

Git在提交方面跟SVN很不一样，Git可以理解为有两级提交，先commit提交到本地，在从本地仓库push推送到远程仓库。

#### 3.2.1.add：索引需要提交的文件

例如需要提交abc.text文件，需要将abc.txt添加到索引

```bash
git add abc.txt'
```
也可以用通配符*，表示所有文件
```bash
git add *
```

#### 3.2.2.commit：提交到本地仓库

```bash
$ git commit -m 'commit for test'
[master 5ede942] commit for test
 1 file changed, 3 insertions(+)
```

Git提交时，需要执行commit message，否则不允许提交。

`commit`只是提交到本地仓库，远程仓库是看到的，也就说，其他开发人员看不到只`commit`而没有`push`的内容。

**需要注意的是，要养成经常commit的习惯，commit的内容，只要本地仓库不删除，都可以进行恢复。**

#### 3.2.3.push：推送到远程仓库

```bash
$ git push
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 251 bytes | 0 bytes/s, done.
Total 3 (delta 1), reused 0 (delta 0)
To http://10.61.20.200:3000/EOMP/Projects.git
   44a06b4..5ede942  master -> master
```

`push`只会推送`commit`过的内容，也就是本地仓库推送到远程仓库，不会影响工作空间的内容。

**最佳实践：push之前，最好先pull。**

### 3.3.合并：merge(合并)、rebase（变基/衍和）

合并相对SVN来说相对复杂，当熟悉之后，往往效率比SVN更高。

`merge`和`rebase`都是Git中用于合并的命令。两者区别详看：

http://gitbook.liuhui998.com/4_2.html

**注意**:`git pull`中，带有合并的操作，默认用的合并命令为merge，想指定rebase，可以使用参数，如下：

```bash
git pull --rebase
```

`merge`和`rebase`也可以用于合并分支，后面详述。

### 3.4.恢复：reset、revert

在开发过程中，经常会遇到重置到某个版本，某次提交或者恢复某个文件的情形。

reset针对本地仓库和工作空间，而revert是针对某次提交。

#### 3.4.1.reset：重置本地工作空间到某个指定状态

重置当前工作空间的所有修改

```bash
git reset --hard
```

会将最新的3次提交全部重置
```bash
git reset --hard HEAD~3
```

重置到某个指定版本
```bash
git reset --hard 44a06b
```

#### 3.4.2.revert：恢复到某次提交

```bash
git revert 44a06b
```

恢复到某次提交，意思就是想某天提交的文件状态重置到工作空间。

例如某如提交，修改了A.txt，commit的hash为44a06b，我们通过git revert 44a06b,可以将A.txt那次的状态重置到工作目录，再进行相关操作。

**revert最佳实践：一个功能或一个fixbug，可以做一个commit，如果多个功能修改或多个fixbug放到一次提交里，则在revert时，则会非常不方便。**

## 4.Git高级操作

### 4.1.分支操作

#### 4.1.2.创建

```bash
git branch test // 创建test分支
```

#### 4.1.3.查看本地所有分支

```bash
git branch
```

#### 4.1.4.检出/切换分支

```bash
git checkout test // 检出test分支
```

#### 4.1.5.合并分支

合并分为merge和rebase，分别有

```bash
git merge test  // 将test分支merge过来
git rebase test // 将test分支衍合过来
```

### 4.2.Cherry-Pick提取commit

cherry-pick的主要作用，就是在分支开发过程中，将分支A的某次提交commitA，提取过来，并提交到分支B，这在某些场景是否受用。

```bash
git cherry-pick 38361a68 // 提交的散列值
```

### 4.3.reflog查看引用日志

reflog可以查看本地仓库的所有操作记录。这对丢失commit或者reset时，非常有用。

```bash
git reflog
```

当你需要恢复某些操作，而通过git log找不到相关的操作散列值时（git只记录commit记录），这时候想起reflog就对了。

## 5.使用图形化工具SmartGit重新演示一遍

## 6.Git应用场景与最佳实践

### 6.1.push之前先pull，`pull`使用`--rebase`，即`pull --rebase`

### 6.2.基于功能点/bug进行commit

### 6.3.注释，一定要写注释
	
* update：某些功能更新
* fixbug：修复bug
* feature：新功能

### 6.4.基于分支开发，主干发布

* 主要分支：
	* **master分支**：线上分支，发布分支
	* **deveploper分支**：开发基于次分支
* 临时性分支(用完即删)：
	* **feature**：功能分支，用于开发某种特定功能，建议采用feature-*的形式命名；
	* **release**：预发布分支，发布正式版本之前（即合并到Master分支之前)，可以用于测试等，建议采用release-*的形式命名；
	* **fixbug**：修复bug分支，一般用于线上bug修复，根据线上版本创建分支，修复bug之后，再合并到master和developer；建议采用fixbug-*的形式命名；

### 6.5.场景1：A开发一个功能，功能改动比较大，周期比较长，在功能没开发完成前，对其他人员不可见

* **SVN做法：**
	* copy一份代码（SVN上的分支），在基础上进行开发完成后，最后进行合并；
	* 在本地开发，代码不提交，等完成之后再提交；
* **SVN的做法缺点：**
	* SVN copy分支之后，其他人的改动对A不可见，需要要经过复杂的合并流程；
	* 如果要开切回主分支进行开发，则要管理两份代码，开两个IDE，容易出错；
	* 代码n份，版本库存压力大；
	* 最后合并复杂度高，需要借助diff工具，复杂的合并流程；

* **Git做法：**
	* 创建一个feature分支，可以随时合并开发分支上其他人的修改；
	* 只要管理一份代码库，一个IDE，切换、合并十分方便；

### 6.6.场景2：A正在开发一个功能，修改的文件比较多，突然收到一个bug，需要及时修复，且修改的文件跟目前的文件有冲突

* Git做法1：根据远程仓库，创建一个fixbug-xx的分支，在分支上进修修改,合并到远程仓库，等开发的功能完成后，跟远程仓库进行合并即可；
* Git做法2：将工作空间修改的文件进行暂存`git stash`，然后修改bug相关的文件，然后push到服务器，最后将暂存的文件pop到工作空间`git stash pop`;

> 如果远程仓库存在多个分支，且分支都需要修复这个bug，做法1更合适，如果只有单一分支，则做法2更合理。

### 6.7.场景3：假如产品已经发布了分支release2.0,对应的开发分支为developer2.0，现在开发到了developer3.0。现在想发布release2.1，里面带有developer3.0里面的部分功能

* Git做法1：找到deveploer3.0里面对应功能的commit记录，将他们一一cherry-pick到release。

> cherry-pick的主要作用就是，在分支A中，重演分支B中的指定的commit。

![](images/feature_2_developer.png)


## 7.参考文档
* http://www.ruanyifeng.com/blog/2012/07/git.html
* https://git-scm.com/book/zh/v2


