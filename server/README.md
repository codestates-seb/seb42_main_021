# EverybodyChaChapark BackEnd Server Release Guide
EverybodyChaChapark BackEnd Server 배포 가이드

<br>

## Spring Application Install
``` $ git clone https://github.com/codestates-seb/seb42_main_021.git ```

<br>

## Spring Application Build
```$ ./gradlew build```

<br>

## Spring Application Start
``` java -jar EverybodyChachapark-0.0.1-SNAPSHOT.jar ```

<br>

## Spring Application Profile
``` java -jar build/libs/EverybodyChachapark-0.0.1-SNAPSHOT.jar --spring.profiles.active=(profileName) ```

<br>

## Linux bash Shell
- 프로그램 백그라운드 실행  
``` $ nohup (명령어) & ```


- 프로세스 실행 확인 명령어  
``` $ ps -ef | grep (찾을 단어) ```


- 프로세스 강제 종료 명령어  
``` $ kill -9 (PID번호) ```
