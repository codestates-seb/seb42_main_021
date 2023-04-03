#!/bin/bash
BUILD_JAR=$(ls /home/ubuntu/seb42_main_021/server/EverybodyChachapark/build/libs/EverybodyChachapark-0.0.1-SNAPSHOT.jar)
JAR_NAME=$(basename $BUILD_JAR)
DEPLOY_PATH=/home/ubuntu/action/

if [ ! -d $DEPLOY_PATH ]
then
  mkdir $DEPLOY_PATH
fi

echo "> 현재 시간: $(date)" >> /home/ubuntu/action/deploy.log

echo "> build 파일명: $JAR_NAME" >> /home/ubuntu/action/deploy.log

echo "> build 파일 복사" >> /home/ubuntu/action/deploy.log

cp $BUILD_JAR $DEPLOY_PATH

LOG_PATH=/home/ubuntu/logs

if [ ! -d $LOG_PATH ]
then
  mkdir $LOG_PATH
fi

echo "> 현재 실행중인 애플리케이션 pid 확인" >> /home/ubuntu/action/deploy.log
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> /home/ubuntu/action/deploy.log
else
  echo "> kill -9 $CURRENT_PID" >> /home/ubuntu/action/deploy.log
  echo "백그라운드 실행중인 서버 종료"
  sudo kill -9 $CURRENT_PID
  sleep 5
fi

DEPLOY_JAR=$DEPLOY_PATH$JAR_NAME
SPRING_PROFILE=--spring.profiles.active=server
echo "> DEPLOY_JAR 배포"    >> /home/ubuntu/action/deploy.log
sudo nohup java -jar $DEPLOY_JAR $SPRING_PROFILE >> /home/ubuntu/deploy.log 2>/home/ubuntu/action/deploy_err.log &