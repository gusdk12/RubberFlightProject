# 🌟 LOVER AIR란?
<p align="right">
  <a href="https://www.youtube.com/watch?v=59fw-YCZ5K4&list=PLedGoSru7948CbDAFR7ldzPuhvO0XBgxF&index=2">‘🔗LOVER AIR 발표 영상’</a> / 
  <a href="https://www.youtube.com/watch?v=_b2VAOLMK2s&list=PLedGoSru7948CbDAFR7ldzPuhvO0XBgxF&index=5">‘🔗LOVER AIR 발표 화면’</a>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/fc9a6ab7-d818-4c3c-9ed3-609c71c74e8c" width="700" height="400">
</p>
<p align="center">‘LOVER AIR 메인 페이지 화면’</p>

## 🔍 프로젝트 특징 및 기능
- 날짜에 해당하는 항공권 검색 및 예약, 비행기 실시간 추척, 일정 계획, 항공사 리뷰 작성 및 조회 등 다양하게 이용할 수 있는 사이트
- 회원/비회원 운영 시스템으로, 권한은 사용자 / 관리자 권한으로 페이지 구분
- **‘Aviation Edge API’** 로 웹 개발에 필요한 정보들을 활용하여 개발
→ 나라 정보, 공항 정보, 예정된 비행 루트 검색, 실시간 비행 스케줄 업데이트, 실시간 비행 추적
- **‘WebSocket’** 을 활용하여 사용자들이 실시간으로 일정 계획 및
 **‘Cohere API’ & “Google search API’** 활용으로 챗봇 제작으로 여행지 추천
- 주요 개발 기능
    - 회원가입(손님/관리자), 로그인
    - 권한별 사이트 이용
        - 비회원 - 항공권 검색, 실시간 비행기 추척 조회, 항공사별 리뷰 조회
        - 사용자 - 항공권 검색 및 예약, 비행기 실시간 추적 조회 , 예약 정보 조회, 일정 계획, 항공사 리뷰 등록 및 수정, 삭제
        - 관리자 - 나라 및 공항 관리, 쿠폰 관리

### [진행 기간]
2024년 7월 30일 ~ 2024년 8월 27일

### [기획 순서]
브레인스토밍 →  ERD 및 흐름도, 스토리보드 작성 → 개발 일정 계획 → 각 페이지 개발 시작 → 각 페이지 QA 진행 및  수정 
<br/>→ AWS 배포 → 시연 및 발표

### [역할]
<table>
  <thead align="center">
    <td>팀원명</td>
    <td>맡은 역할</td>
    <td>내용</td>
  </thead>
  <tr>
    <td align="center">송유신&nbsp; (팀장)</td>
    <td>- 메인 페이지<br/>- 여행 일정 페이지<br/>- 개발 QA</td>
    <td>- 일정 조율, 개발QA<br/>- React Three Fiber를 활용한 3D 환경 구축 및 메인페이지 제작<br/>- Axios, JPA를 통한 일정 CRUD 구현<br/>- Websocket을 활용한 협업 페이지 기능 구현
      <br/>- 일정 짜기 페이지 프론트 구현, 일정 편집 페이지 구현</td>
  </tr>
  <tr>
    <td align="center">신현아</td>
    <td>- 리뷰 페이지<br/>- AI 챗봇</td>
    <td>- JPA를 활용한 객체와 데이터베이스 간의 매핑으로 데이터 조회를 통해 <br/>&nbsp; 리뷰 CRUD 구현<br/>- 유저별/항공사별 리뷰 페이지 프론트엔드 구현 및 최신순/별점순 조회로 <br/>&nbsp; 페이징 구현
      <br/>- Cohere API와 Google Search API를 활용하여 여행지를 추천해주는 <br/>&nbsp; AI 챗봇 제작 및 프론트엔드 구현</td>
  </tr>
  <td align="center">김예현</td>
    <td>- 항공권 예약 및 <br/>&nbsp; 결제 페이지</td>
    <td>- 예정된 비행 API, 공항 데이터베이스를 활용한 항공권 검색 및 예약 페이지 <br/>&nbsp; 구현<br/>- 포트원 API를 활용한 결제 기능 구현<br/>- 쿠폰 데이터베이스를 활용한 사용자 쿠폰 사용 기능 구현
      <br/>- 사용자 작성한 리뷰 개수, 예약한 횟수, 쿠폰 개수 연동</td>
  </tr>
  <td align="center">홍가연</td>
    <td>- 나라, 공항 관리페이지<br/>- AWS 배포</td>
    <td>- 나라, 공항 API를 활용한 관리페이지 구현<br/>- 실시간 항공 API와 구글맵 API를 활용한 실시간 비행 추적 페이지 구현<br/>- AWS 및 Nginx를 활용한 백엔드와 프론트엔드 배포</td>
  </tr>
  <td align="center">이다혜</td>
    <td>- 사용자 CRUD(OAuth2 활용)<br/>- 체크리스트 페이지</td>
    <td>- OAuth2를 활용한 로그인 및 회원가입 설계<br/>- 마이페이지 내 정보페이지 및 회원정보 변경 구현<br/>- 체크리스트 CRUD 구현</td>
  </tr>
  <td align="center">김다현</td>
    <td>- 쿠폰 관리 페이지<br/>- 예약정보 페이지</td>
    <td>- 관리자 쿠폰 관리 기능 구현 및 페이지 제작<br/>- 사용자 쿠폰 관리 기능 구현<br/>- 항공권 일정 API를 활용한 사용자 예약 확인 기능 구현 및 페이지 제작
      <br/>- 마이페이지 및 항공권 검색, 항공원 결제페이지 프론트엔드 구현</td>
  </tr>
</table>

# 🍸 Rubber Bar 개발
## 🛠️ 개발 기술
<p align="center">
  <img src="https://github.com/user-attachments/assets/d7124bb4-1979-4a4c-86b4-8c6a39a1f181" width="700" height="400">
</p>

## 👩‍💻 내가 개발한 부분
### <메뉴 관리 페이지>
- 제작 페이지
    - 메인 페이지 - 항공사 리뷰 페이지
    <p align="center">
      <img src="https://github.com/user-attachments/assets/8fd3b529-d69b-4b8b-895d-be96ba355af4" width="700" height="500">
    </p>  
    
    - 마이페이지 - 리뷰 작성 페이지
    <p align="center">
      <img src="https://github.com/user-attachments/assets/f546b221-e949-4908-84cd-e8e43117516b" width="700" height="500">
    </p> 

    - 마이페이지 - 리뷰 관리 및 수정, 삭제
    <p align="center">
      <img src="https://github.com/user-attachments/assets/44b64670-7130-422a-9a42-ab923a73622d" width="700" height="500">
    </p>   

- 기술 구현
<p align="center">
  <img src="https://github.com/user-attachments/assets/326201f7-72a2-48c6-a618-042eae6eb5b9" width="400" height="250">
  <p align="center">‘Review 와의 연결 관계’</p>
</p>

&nbsp;Review 페이지를 구현하기 위해서는 먼저 백엔드에서 데이터를 활용할 수 있도록 엔티티(테이블) 간의 연결(Join)이 필요했습니다. 사용자의 정보를 가져오기 위해, 사용자가 예약한 예약 내용, 예약된 정보를 연결하고, 
리뷰가 작성된 항공사를 저장하는 항공사 <br/>엔티티도 연결을 하여 데이터를 사용할 수 있도록 연결하였습니다. 

&nbsp; 이를 위해 데이터 조회를 하기 위해 ‘JPA’ 를 활용하여 데이터를 조인하였고, ORM 기술을 통해 객체와 데이터베이스 간의 <br/>매핑이 이루어져 메소드 이름만으로도 자동 SQL문이 생성되어 
효율적으로 데이터 조인을 할 수 있어 간단하게 데이터 조회를 <br/>할 수 있었습니다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/578afa58-15c0-472c-8fd2-053e4827e5d8" width="600" height="300">
  <p align="center">‘데이터 조인을 위한 ReviewRepository - 최신순 / 별점순 조회로 페이징 구현’</p>
</p>

 &nbsp; 간단한 메소드 이름만으로 원하는 데이터를 조회할 수 있었지만 별점순은 각 별점들의 평점을 구해야만 했기에 SQL문 작성이 <br/>필요하여 Native Query를 작성하여 데이터 조인을 할 수 있었고, 
 이러한 데이터들을 페이징을 구현하여 화면에서 사용자가 원하는 카테고리로 데이터를 조회할 수 있도록 구현하였습니다.

 <p align="center">
  <img src="https://github.com/user-attachments/assets/b159b225-2864-4d34-84ae-83cd5bbefc31" width="300" height="300">
  <p align="center">‘Review 엔티티와 FlightInfo, Airline 엔티티 간의 관계 설정 방법’</p>
</p>

 &nbsp; 리뷰 작성을 할 때는 사용자가 예약한 정보 데이터를 가지고 있어야 했기 때문에 ‘리뷰 작성’ 버튼을 눌렀을 때 백엔드에서 리뷰를 작성하려는 해당 예약 정보 데이터가 있는지 확인을 한 후,
 작성하려는 항공사 데이터가 있는지를 확인합니다. 항공사 데이터가 <br/>기존에 있다면 해당 데이터를, 데이터가 없다면 새롭게 생성하여 저장한 후에 그 데이터를 가지고 와서 리뷰가 작성될 때 
 같이 해당 예약 정보와 항공사를 연결하여 관계를 맺어주도록 구현했습니다.

### <AI 챗봇>
- 제작 페이지
 <p align="center">
  <img src="https://github.com/user-attachments/assets/40b58415-249c-40fd-ab61-812d29b4278f" width="200" height="400">
</p> 

- 기술 구현
<p align="center">
  <img src="https://github.com/user-attachments/assets/b4abaaed-7aaa-4f22-9d62-2b603d5689b3" width="300" height="300">
  <p align="center">‘AI 챗봇 데이터 전달 과정’</p>
</p>
  
***<AI 답변 조정>***
<p align="center">
  <img src="https://github.com/user-attachments/assets/8f040c0f-bb39-44fe-9495-dd4b474f7117" width="400" height="200">
  <p>&nbsp; ⇒ AI의 역할과 답변 형식을 프롬프트로 작성하여 전달하였지만 더 세밀하게 조정하고자 옆의 각 파라미터들에 값을 적용하여 <br/>원하는 답변으로 조정할 수 있었습니다.</p>
</p>

***<구글 검색 API에 전달 과정>***
- 구글 검색 API에 전달되는 필터링 설정
<p align="center">
  <img src="https://github.com/user-attachments/assets/be92b10b-cb19-42f1-8512-3fcc5c2f63c2" width="500" height="250">
  <p align="center">‘번호 형식의 답변일 경우, ‘숫자.’, ‘ : ’ 사이의 단어만 추출’</p>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/52ad3197-3a2e-46c2-b31b-a39b26b2838e" widht="600" height="250">
  <p align="center">‘AI 답변 길이에 따라 검색 여부 결정’</p>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/5e6f024c-a5d1-4790-8b4b-1f70c0daef36" widht="400" height="100">
  <p align="center">‘URL 검색 조건 설정’</p>
</p>

### 💡 문제 상황 발생 및 해결
&nbsp; AI 챗봇의 추천 여행지에 대한 추가적인 정보를 제공하기 위해 ‘Google Search API’를 같이 사용하였습니다. <br/>초반엔 AI 답변을 그대로 Google Search API에 전달하여 검색을 하였지만 
AI의 답변이 길어지면 검색이 되지 않거나 정확도가 <br/>떨어지는 오류가 발생했습니다.

&nbsp; 이를 해결하기 위해 위의 사진처럼 AI의 답변을 번호 형식으로 변경하였고, 번호가 붙은 단어만 추출하여 키워드로만 검색이 <br/>되도록 필터링을 설정했고, 만일 번호 형식이 아닌 문장으로 나올 경우에 
2문장 이상일 경우에는 검색이 이루어지지 않게 설정하여 오류를 해결하였습니다.

&nbsp; 또한 구글 검색을 하였을 때, 검색 결과가 너무 많이 나오고 유해성인 내용을 포함하지 않도록 하기 위해 API 전달 URL에 안정성과 출력 개수를 설정하여 사용자에게 안전하고 적절한 내용이 제공될 수 있도록 설정하였습니다.

# 🌈 소감
&nbsp; 이전부터 개발해보고 싶었던 항공 관련 웹사이트를 제작을 통해 팀원들과 함께 개발한 프로젝트 결과물을 보면서 뿌듯함을 많이 느낄 수 있었습니다. 이전과 다른 기술들을 사용하여 개발하는데 
어색하고 시행 착오도 있었지만 팀원들과의 소통을 통해 문제를 해결하기도 했지만 스스로 자료를 더 찾아보고 공부해보면서 저 스스로에게 도움이 되고 성장할 수 있는 기회였던 것 같습니다. 

&nbsp; 첫 번째 프로젝트 때와 다른 부분을 개발해보면서 새롭게 AI 챗봇을 제작해보면서 신기하기도 하고 재미를 느끼면서 추후에 <br/>기회가 된다면 또 다른 기능을 활용하여 웹페이지 제작에 도움이 되는 
요소들을 같이 활용하여 개발해보고 싶습니다.
