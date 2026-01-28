// クイズ管理クラス
class QuizManager {
    constructor() {
        this.subject = null;
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.selectedIndex = null;  // 選択中の回答
        this.answered = false;      // 答え合わせ済みかどうか

        this.init();
    }

    init() {
        // URLパラメータから教科を取得
        const params = new URLSearchParams(window.location.search);
        const subjectKey = params.get('subject');

        if (!subjectKey || !quizData[subjectKey]) {
            window.location.href = 'index.html';
            return;
        }

        this.subject = quizData[subjectKey];
        this.questions = this.shuffleArray([...this.subject.questions]).slice(0, 10);

        this.renderQuizHeader();
        this.renderQuestion();
        this.bindEvents();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    renderQuizHeader() {
        document.getElementById('subject-name').textContent = `${this.subject.icon} ${this.subject.name}`;
        this.updateProgress();
    }

    updateProgress() {
        document.getElementById('progress').textContent =
            `${this.currentIndex + 1} / ${this.questions.length}`;
    }

    renderQuestion() {
        const question = this.questions[this.currentIndex];

        document.getElementById('question-number').textContent =
            `第${this.currentIndex + 1}問`;
        document.getElementById('question-text').textContent = question.question;

        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.dataset.index = index;
            optionsContainer.appendChild(button);
        });

        // 結果エリアを非表示
        document.getElementById('result-area').className = 'result-area';

        // ボタンの状態をリセット
        const nextBtn = document.getElementById('next-btn');
        nextBtn.disabled = true;
        nextBtn.textContent = '答え合わせ';

        this.selectedIndex = null;
        this.answered = false;

        this.updateProgress();
    }

    selectOption(index) {
        if (this.answered) return;

        this.selectedIndex = index;

        // 選択肢のスタイルを更新
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach((btn, i) => {
            btn.classList.remove('selected');
            if (i === index) {
                btn.classList.add('selected');
            }
        });

        // 答え合わせボタンを有効化
        document.getElementById('next-btn').disabled = false;
    }

    checkAnswer() {
        if (this.selectedIndex === null || this.answered) return;

        this.answered = true;
        const question = this.questions[this.currentIndex];
        const isCorrect = this.selectedIndex === question.answer;

        if (isCorrect) {
            this.score++;
        }

        // 選択肢のスタイルを更新
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach((btn, index) => {
            btn.disabled = true;
            btn.classList.remove('selected');
            if (index === question.answer) {
                btn.classList.add('correct');
            } else if (index === this.selectedIndex && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // 結果を表示
        const resultArea = document.getElementById('result-area');
        resultArea.className = `result-area show ${isCorrect ? 'correct' : 'incorrect'}`;

        document.getElementById('result-title').textContent =
            isCorrect ? '正解！' : '不正解...';
        document.getElementById('result-explanation').textContent = question.explanation;

        // ボタンを「次へ」に変更
        const nextBtn = document.getElementById('next-btn');
        nextBtn.textContent = this.currentIndex < this.questions.length - 1 ? '次へ' : '結果を見る';
    }

    nextQuestion() {
        this.currentIndex++;

        if (this.currentIndex >= this.questions.length) {
            this.showFinalResult();
        } else {
            this.renderQuestion();
        }
    }

    showFinalResult() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        let message = '';

        if (percentage === 100) {
            message = '完璧です！素晴らしい！';
        } else if (percentage >= 80) {
            message = 'よくできました！';
        } else if (percentage >= 60) {
            message = 'まあまあですね。もう少し頑張ろう！';
        } else if (percentage >= 40) {
            message = 'もう少し復習が必要です。';
        } else {
            message = '基礎からしっかり復習しましょう！';
        }

        document.querySelector('.quiz-container').innerHTML = `
            <div class="final-result">
                <h2>${this.subject.icon} ${this.subject.name} クイズ結果</h2>
                <div class="score-display">${this.score} / ${this.questions.length}</div>
                <p class="score-message">${message}</p>
                <div class="nav-buttons">
                    <button class="nav-btn secondary" onclick="location.href='quiz.html?subject=${this.getSubjectKey()}'">
                        もう一度挑戦
                    </button>
                    <button class="nav-btn primary" onclick="location.href='index.html'">
                        トップへ戻る
                    </button>
                </div>
            </div>
        `;
    }

    getSubjectKey() {
        const params = new URLSearchParams(window.location.search);
        return params.get('subject');
    }

    showModal() {
        document.getElementById('confirm-modal').classList.add('show');
    }

    hideModal() {
        document.getElementById('confirm-modal').classList.remove('show');
    }

    bindEvents() {
        // 選択肢クリック
        document.getElementById('options').addEventListener('click', (e) => {
            if (e.target.classList.contains('option-btn')) {
                this.selectOption(parseInt(e.target.dataset.index));
            }
        });

        // 答え合わせ/次へボタン
        document.getElementById('next-btn').addEventListener('click', () => {
            if (!this.answered) {
                // まだ答え合わせしていない場合
                this.checkAnswer();
            } else {
                // 答え合わせ済みの場合は次の問題へ
                this.nextQuestion();
            }
        });

        // 戻るボタン
        document.getElementById('back-btn').addEventListener('click', () => {
            this.showModal();
        });

        // モーダルのキャンセルボタン
        document.getElementById('modal-cancel').addEventListener('click', () => {
            this.hideModal();
        });

        // モーダルの確認ボタン
        document.getElementById('modal-confirm').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // モーダル外クリックで閉じる
        document.getElementById('confirm-modal').addEventListener('click', (e) => {
            if (e.target.id === 'confirm-modal') {
                this.hideModal();
            }
        });
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new QuizManager();
});
