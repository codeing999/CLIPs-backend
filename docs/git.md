# git 시작 (항상 필수는 아니고 경우에 따라 다름)

- 프로젝트 폴더 터미널에서

git init

쳐서 git 프로젝트로 만들기.

실제 폴더에 가보면 숨김 파일로 .git이 생성되어 있음. (나중에 git이 꼬였을 때 최후의 수단으로 .git폴더 자체를 지우고 다시 git프로젝트로 만들면 된다.)

- 프로젝트에 .gitignore 파일 생성하고

node_moduels
.env
작성

# 협업 시작할 때

## 원격 레포지토리 클론할 때

organization을 만들어도 되고 팀원 중 개인이 만들어도 되고 레포지토리를 깃헙에 만든다.

이 때 README.md를 체크한다. 안하면 파일이 아무것도 없어서 클론이 안된다.

모든 팀원이 해당 깃헙주소를 클론한다.

## vscode 기존 프로젝트를 원격 레포지토리로 올리고 싶다면

github에서 레포지토리를 만든 후(이때는 README.md 생성하지 않고 만들기. 만들면 충돌나서 안올라감) 아래 명령어 입력

```terminal
git init //현재 프로젝트를 git프로젝트로 만들기. .git 생성됨.
git remote add origin 깃헙주소 //해당 깃헙레포지토리를 origin이라는 별칭으로하여 원격 저장소로 연결.
git remote -v //원격저장소 목록 확인.
git add .
git commit -m '커밋 주석'
git push origin main
```

# 브랜치 만들기

git branch 브랜치명

혹은

git checkout -b 브랜치명

차이점은 checkout으로 하면 그 브랜치로 바로 switch 까지 한다.

원격에도 해당 브랜치를 만드려면 해당 이름으로 push를 한다.

- 항상 유지되는 브랜치는 git flow에 의거하여 main과 dev 두 개이고
- 나머지는 일시적으로 필요에 의해 만들고나서 dev에 merge한 후에는 브랜치를 삭제한다.

# git flow 예시

참고 : [우아한형제들 기술블로그 : 우린 Git-flow를 사용하고 있어요](https://techblog.woowahan.com/2553/)

Git-flow에는 5가지 종류의 브랜치가 존재합니다. 항상 유지되는 메인 브랜치들(main, develop)과 일정 기간 동안만 유지되는 보조 브랜치들(feature, release, hotfix)이 있습니다.

main : 제품으로 출시될 수 있는 브랜치

develop : 다음 출시 버전을 개발하는 브랜치

feature : 기능을 개발하는 브랜치

release : 이번 출시 버전을 준비하는 브랜치

hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치

# branch 관련 명령어

```
git branch //현재 내 브랜치 확인
git branch -r //원격 브랜치들 확인
git branch -a //모든 브랜치들 확인
git branch -v //브랜치 버젼까지 확인
git branch 브랜치명 //로컬에 브랜치 생성
git checkout -b 브랜치명 //로컬에 해당 브랜치 생성 후 switch까지

git reflog //branch 끼리 일치 여부 확인.
```

## 완료된 branch 삭제하고 새 브랜치 만들기

```
git checkout dev
git branch -D 사용했던_브랜치 //삭제. -d도 동일.
git checkout -b feature/기능
git pull origin dev
```

## branch 이름 바꾸기

```
git branch -m OLD_BRANCH NEW_BRANCH
위 명령어로 로컬 브랜치를 만든 후,
원격 브랜치의 이름 변경은
git push origin NEW_BRANCH //새 브랜치를 푸쉬
git push origin --delete OLD_BRANCH //원격의 기존 브랜치 삭제
git push origin :OLD_BRANCH //위와 동일하게 원격 브랜치 삭제하는 명령어. 둘 중 하나만 쓰면 된다.

혹은 브랜치 생성과 삭제를 동시에 할 수도 있다.
git push origin :old_branch new_branch //기존 브랜치 삭제와 새 브랜치 푸쉬를 동시에 한다.
```

# push 옵션

```
git push -u (생략) : 다음 번 부터 지금 경로를 기본으로 삼아서 그냥 git push만 써도 지금 쓴 명령어를 수행함.
git push --force 또는 -f (생략) : 강제 푸쉬
git push --force-with-lease (생략) : 자신 이외의 사람이 브랜치에 기여하지 않은 경우에만 강제
```

# 작업할 때 습관

- 평소 코딩할 땐 npx nodemon index.js 를 켜두고 코딩하면서 에러 없는지 항상 확인.
- 작업을 저장하고나서 안 쓰는 파일은 최대한 꺼두기. 안그러면 저장 안한 채로 켜져있는 파일들이 있을 수 있다.
- 각 git 명령어 단계마다 에러가 안나고 잘 이행됬는지 확인하고 다음 명령어를 쳐야한다. 특히 branch 잘 확인
- git 작업할 때 git status는 수시로 치는 습관. 또한 최상위 경로에서 git 명령어들을 쳐야한다

# 내가 Pull Request 할 때

```
내 작업에 오류가 없는 상태일 때만 풀리퀘스트를 한다.
내 브랜치(dev/codeing999라고 가정)인 상태에서
git add . //되도록 add . 보단 일일이 하는 습관이 좋음
git commit -m '커밋 제목' -m '커밋 내용'
git push origin dev/codeing999 //origin이란 원격이란 의미를 갖는다. 원격의 저 브랜치에 푸쉬하겠단 의미
이렇게 원격의 내 브랜치에 푸쉬한 후에.

깃헙에서 pull request를 눌러서
왼쪽에 내껄 합칠 브랜치(예를 들면 develop), 오른쪽에 내 브랜치를 넣고 옆에 라벨 등 기타 등등 작성하고 완료하면
충돌이 났을 수도 있고 안났을 수도 있다.
났다면 내가(혹은 팀원들이랑 같이) 충돌 내용확인해서 고치고 안났으면
그냥 풀리퀘 완료 시키면 된다.
그리고 팀원들한테 풀리퀘스트를 알린다.
```

# 다른 사람의 Pull Request 받을 때

```
일단 난 내 브랜치에서 코딩 중이었을 거고, 내 작업 중인 것들을 커밋까지만 한다. (커밋을 안하면 스위치가 안되므로)
git add .
git commit -m '커밋 제목' -m '커밋 내용'

그 후에 이제 다른 사람의 Pull Request를 받는데,
git switch develop
git fetch
git pull origin develop
이렇게 내 브랜치를 develop으로 변경한 후 거기에서 pull을 받는다.

다시 내 브랜치로 돌아와 머지
git switch dev/codeing999
git merge develop //로컬의 develop 브랜치를 지금 현재 브랜치로 합친단 의미
```

# .gitignore에 등록해놓은 파일이 자꾸 원격에 올라갈 때 (아직 제대로 해보진 않음)

git의 캐시가 문제가 되는 거라서 아래 명령어로 캐시 내용을 전부 삭제 후 다시 add ALL해서 커밋하면 된다고 한다.

```
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

# github 기능

## Issues

- 버그, 새 기능, 질문, 리팩토링 등등 말그대로 모든 이슈에 관해 작성하는 것이다.
- 댓글을 통해 다른 기여자들과 소통하고 해결이 되면 이슈를 close한다.
- 같은 종류의 이슈들에 대해 milestone을 붙일 수 있는데, 이 마일스톤의 목표기간을 정할 수 있고, 이 마일스톤에 해당하는 이슈 중 몇개나 close되었는지 표시도 된다.
- 설정에 가면 버그면 버그, 이슈의 종류에 따라 그 형식에 맞게 작성하도록 템플릿을 작성해 놓을 수 있다.

### Issue Template 예시

- Bug report

```
# 문제점

//각 항목별 필요시 스크린샷 포함

## 작업 내용

//작업 내용에 대한 간단한 설명

## 의도한 결과

## 실제 결과

//에러코드 포함

# 조치 사항

//해결을 위해 시도해본 것들과 그 결과 (이미 시도해본 것은 답변에 달리지 않도록)
//본인 코드 등등

```

- New feature

이건 내가 만든 분류인데 프로젝트 시작 시, 각자 맡은 담당 기능을 이슈에 등록하고 기능의 변경 사항이나 토의 내용을 댓글로 기록하도록 함.

공통된 기능 별로 milestion에 등록하도록 함.

```
# 기능 이름

//기능이 API일 때만 아래 형식을 지키고 다른 경우엔 자유롭게 작성

method :
path :
request header :
request body :

response (성공 시):
- status code :
- body :

response (실패 시) :
- status code :
- body :

# 그외 기능에 대한 설명
// 기능의 목적
// 아직 미정인 것들, 더 협의해야할 것들
// 추가로 들어갈 수 있을 것들
```

## Pull request

- PR은 굳이 순서 상으로 치면 Issue보다 뒤에 하는 것. PR을 할 때 어떤 이슈에 대한 PR을 한 것인지 #번호로 이슈를 달 수 있다.
- Assignees : 이 작업에 대한 담당자. 보통 글 쓴 본인 넣으면 됨.
- Label : 이 작업이 어떤 성격을 갖는지 라벨 붙이는 것. 원하는 라벨을 추가할 수도 있다.
- merge까지 성공하고 현재 브랜치를 이제 지우고 싶다면 지우는 버튼이 있으니 여기서 지우면 된다.

## Wiki

문서 작성한 걸 여기에 넣는 거라고 함. 그럼 docs 폴더는 필요 없어지는 건가?
