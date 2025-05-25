document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    
    // 대화 맥락을 저장할 배열
    let conversationContext = [];
    
    // 기본 응답 데이터베이스
    const responses = {
        // 기본 인사
        '안녕': '안녕하세요! 학습 도우미입니다. 무엇을 도와드릴까요?',
        '반가워': '반갑습니다! 학습에 관한 어떤 질문이든 편하게 물어보세요.',
        
        // 학습 관련
        '계획': '학습 계획은 "계획 만들기" 페이지에서 작성할 수 있습니다. 날짜, 과목, 목표를 입력하면 됩니다. 구체적인 목표를 세우는 것이 중요합니다.',
        '진행률': '전체 학습 계획 중 완료된 계획의 비율을 보여드립니다. 홈페이지에서 확인하실 수 있습니다. 꾸준히 체크하면 동기부여가 됩니다.',
        '시간': '스톱워치 기능을 사용하여 공부 시간을 측정할 수 있습니다. 시간 관리는 학습 효율을 높이는 중요한 요소입니다.',
        
        // 학습 방법
        '공부방법': '효과적인 학습을 위한 팁을 알려드릴게요:\n1. 명확한 목표 설정\n2. 규칙적인 학습 시간 확보\n3. 복습과 예습의 균형\n4. 적절한 휴식 취하기\n5. 학습 내용 정리하기',
        '집중': '집중력을 높이는 방법:\n1. 조용한 환경 만들기\n2. 휴대폰 등 방해 요소 제거\n3. 25분 공부 후 5분 휴식\n4. 물을 충분히 마시기\n5. 적절한 조명 유지',
        '동기부여': '학습 동기부여를 위한 방법:\n1. 작은 목표부터 시작하기\n2. 성취감을 느낄 수 있는 보상 설정\n3. 학습 일지 작성하기\n4. 동료와 함께 학습하기\n5. 긍정적인 마인드 유지하기',
        
        // 과목별 조언
        '수학': '수학 학습 팁:\n1. 기본 개념 완벽히 이해하기\n2. 많은 문제 풀기\n3. 오답 노트 만들기\n4. 수식의 의미 이해하기\n5. 꾸준한 연습이 중요합니다.',
        '영어': '영어 학습 팁:\n1. 매일 영어 듣기\n2. 단어장 만들기\n3. 영어로 일기 쓰기\n4. 영어 영상 시청하기\n5. 영어 회화 연습하기',
        '과학': '과학 학습 팁:\n1. 실험과 관찰 중요시하기\n2. 개념 간의 연결성 이해하기\n3. 과학 용어 정리하기\n4. 일상 속 과학 원리 찾기\n5. 과학 뉴스 읽기',
        
        // 시험 준비
        '시험': '시험 준비 방법:\n1. 시험 범위 정리하기\n2. 학습 계획 세우기\n3. 모의고사 풀기\n4. 취약점 보완하기\n5. 충분한 휴식 취하기',
        '불안': '시험 불안 해소 방법:\n1. 충분한 준비하기\n2. 긍정적인 생각하기\n3. 호흡 운동하기\n4. 규칙적인 생활하기\n5. 가벼운 운동하기',
        
        // 도움말
        '도움': '제가 도와드릴 수 있는 것들:\n1. 학습 계획 수립\n2. 과목별 학습 방법\n3. 시험 준비 전략\n4. 동기부여 방법\n5. 시간 관리\n\n구체적인 질문을 해주시면 더 자세히 답변해드립니다!'
    };

    // 대화 맥락을 기반으로 응답 생성
    function generateResponse(input) {
        input = input.toLowerCase().trim();
        
        // 이전 대화 맥락 확인
        const lastUserMessage = conversationContext[conversationContext.length - 2];
        const lastBotMessage = conversationContext[conversationContext.length - 1];
        
        // 맥락 기반 응답 생성
        if (lastUserMessage && lastBotMessage) {
            // 수학 관련 후속 질문
            if (lastBotMessage.includes('수학') && input.includes('어려워')) {
                return '수학이 어려우시군요. 어떤 부분이 특히 어려운가요? 구체적으로 말씀해주시면 더 자세한 도움을 드릴 수 있습니다.';
            }
            
            // 영어 관련 후속 질문
            if (lastBotMessage.includes('영어') && input.includes('단어')) {
                return '단어 암기에 어려움을 느끼시나요? 다음과 같은 방법을 추천드립니다:\n1. 하루 10개씩 목표 설정\n2. 문장 속에서 단어 학습\n3. 이미지나 연상법 활용\n4. 주기적인 복습\n5. 실제 사용해보기';
            }
            
            // 시험 관련 후속 질문
            if (lastBotMessage.includes('시험') && input.includes('불안')) {
                return '시험 불안은 많은 학생들이 경험하는 자연스러운 감정입니다. 다음과 같은 방법을 시도해보세요:\n1. 호흡 운동\n2. 긍정적인 자기 암시\n3. 충분한 준비\n4. 규칙적인 생활\n5. 가벼운 운동';
            }
        }
        
        // 기본 응답 검색
        for (const [key, value] of Object.entries(responses)) {
            if (input.includes(key)) {
                return value;
            }
        }
        
        // 맥락이 없는 경우 기본 응답
        return '죄송합니다. 이해하지 못했습니다. 다음과 같은 주제로 질문해보세요:\n- 학습 계획\n- 공부 방법\n- 과목별 조언\n- 시험 준비\n- 동기부여\n\n"도움"이라고 입력하시면 더 자세한 안내를 받으실 수 있습니다.';
    }
    
    // 메시지 추가 함수
    const addMessage = (text, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        // 줄바꿈 처리
        const formattedText = text.replace(/\n/g, '<br>');
        messageDiv.innerHTML = formattedText;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 대화 맥락에 추가
        conversationContext.push(text);
    };
    
    // 사용자 입력 처리
    const handleUserInput = () => {
        const input = userInput.value.trim();
        if (input) {
            // 사용자 메시지 추가
            addMessage(input, true);
            
            // 봇 응답 생성 및 추가
            setTimeout(() => {
                const response = generateResponse(input);
                addMessage(response);
            }, 500);
            
            // 입력 필드 초기화
            userInput.value = '';
        }
    };
    
    // 이벤트 리스너 추가
    if (sendButton) {
        sendButton.addEventListener('click', handleUserInput);
    }
    
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
    }
    
    // 환영 메시지
    if (chatMessages) {
        setTimeout(() => {
            addMessage('안녕하세요! 학습 도우미입니다. 무엇을 도와드릴까요?\n\n"도움"이라고 입력하시면 제가 도와드릴 수 있는 것들을 알려드립니다.');
        }, 500);
    }
}); 