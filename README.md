## 메타관리시스템 v2(리액트)

백단 데이터는 custom_met 프로젝트를 사용한다

as-is JSP -> to-be 리액트

## 기능

웹으로 테이블을 생성하고 컬럼에 대한 영문변수명과 도메인(=용어)을 조회하기 위한 메타관리시스템

## 사용기술 및 컨셉

1. 공통 모델 cmmn/model/CustomMap.js

2. 공통 유틸 CmmnUtils, LogUtils, AlertUtils

3. 전역상태 관리 -> glboalContext

4. 도메인별 폴더분리

5. jwt 로그인
