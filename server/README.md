# EverybodyChaChapark BackEnd Server Release Guide
EverybodyChaChapark BackEnd Server 배포 가이드

<br>

## Spring Application Start Guide
1. openJDK 설치  
``` $ sudo apt update ```  
``` $ sudo apt install openjdk-11-jre-headless ```  
2. 프로젝트 가져오기 -> Spring Application Install 참고
3. 빌드 -> Spring Application Build 참고
4. 실행 -> EverybodyChaChaPark Server auto booting start 참고

<br>

## Spring Application Install
``` $ git clone https://github.com/codestates-seb/seb42_main_021.git ```

<br>

## Spring Application Build
1. 빌드 실행    
```$ sudo ./gradlew build```  
2. 빌드 삭제   
```$ sudo ./gradlew clean```  

<br>

## EverybodyChaChaPark Server auto booting start
```$ chmod 777 /home/ubuntu/seb42_main_021/server/scripts/deploy.sh```
```$ /home/ubuntu/seb42_main_021/server/scripts/deploy.sh```

<br>

## Spring Application Start
``` sudo nohup java -jar build/libs/EverybodyChachapark-0.0.1-SNAPSHOT.jar &```

<br>

## Spring Application Profile
``` sudo nohup java -jar build/libs/EverybodyChachapark-0.0.1-SNAPSHOT.jar --spring.profiles.active=(profileName) & ```

<br>

## Linux bash Shell
- 프로그램 백그라운드 실행  
``` $ nohup (명령어) & ```


- 프로세스 실행 확인 명령어  
``` $ ps -ef | grep (찾을 단어) ```


- 프로세스 강제 종료 명령어  
``` $ kill -9 (PID번호) ```
