// クイズ管理クラス
class QuizManager {
    constructor() {
        this.subject = null;
        this.subjectKey = null;
        this.unitIndex = null;
        this.unitName = null;
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.selectedIndex = null;
        this.answered = false;

        this.init();
    }

    init() {
        const params = new URLSearchParams(window.location.search);
        this.subjectKey = params.get('subject');
        const unitParam = params.get('unit');

        if (!this.subjectKey || !quizData[this.subjectKey]) {
            window.location.href = 'index.html';
            return;
        }

        this.subject = quizData[this.subjectKey];

        // 単元から問題を取得
        if (unitParam === 'all') {
            // 全単元からランダム
            this.unitName = '全単元';
            let allQuestions = [];
            this.subject.units.forEach(unit => {
                allQuestions = allQuestions.concat(unit.questions);
            });
            this.questions = this.shuffleArray(allQuestions).slice(0, 10);
        } else {
            this.unitIndex = parseInt(unitParam);
            if (isNaN(this.unitIndex) || !this.subject.units[this.unitIndex]) {
                window.location.href = `select-unit.html?subject=${this.subjectKey}`;
                return;
            }
            const unit = this.subject.units[this.unitIndex];
            this.unitName = unit.name;
            this.questions = this.shuffleArray([...unit.questions]);
        }

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
        document.getElementById('subject-name').textContent =
            `${this.subject.icon} ${this.subject.name} - ${this.unitName}`;
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

        document.getElementById('result-area').className = 'result-area';

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

        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach((btn, i) => {
            btn.classList.remove('selected');
            if (i === index) {
                btn.classList.add('selected');
            }
        });

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

        const resultArea = document.getElementById('result-area');
        resultArea.className = `result-area show ${isCorrect ? 'correct' : 'incorrect'}`;

        document.getElementById('result-title').textContent =
            isCorrect ? '正解！' : '不正解...';
        document.getElementById('result-explanation').textContent = question.explanation;

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

    getQuizUrl() {
        const unitParam = this.unitIndex !== null ? this.unitIndex : 'all';
        return `quiz.html?subject=${this.subjectKey}&unit=${unitParam}`;
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
                <h2>${this.subject.icon} ${this.subject.name} - ${this.unitName}</h2>
                <div class="score-display">${this.score} / ${this.questions.length}</div>
                <p class="score-message">${message}</p>
                <div class="nav-buttons">
                    <button class="nav-btn secondary" onclick="location.href='${this.getQuizUrl()}'">
                        もう一度挑戦
                    </button>
                    <button class="nav-btn primary" onclick="location.href='select-unit.html?subject=${this.subjectKey}'">
                        単元選択へ
                    </button>
                </div>
            </div>
        `;
    }

    showModal() {
        document.getElementById('confirm-modal').classList.add('show');
    }

    hideModal() {
        document.getElementById('confirm-modal').classList.remove('show');
    }

    bindEvents() {
        document.getElementById('options').addEventListener('click', (e) => {
            if (e.target.classList.contains('option-btn')) {
                this.selectOption(parseInt(e.target.dataset.index));
            }
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            if (!this.answered) {
                this.checkAnswer();
            } else {
                this.nextQuestion();
            }
        });

        document.getElementById('back-btn').addEventListener('click', () => {
            this.showModal();
        });

        document.getElementById('modal-cancel').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('modal-confirm').addEventListener('click', () => {
            window.location.href = `select-unit.html?subject=${this.subjectKey}`;
        });

        document.getElementById('confirm-modal').addEventListener('click', (e) => {
            if (e.target.id === 'confirm-modal') {
                this.hideModal();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizManager();
});
