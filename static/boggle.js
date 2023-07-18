class BoggleGame {
    constructor(boardId, secs = 60) {
        this.secs = secs;
        this.showTimer();

        this.score = 0;
        this.words = new Set();
        this.board = $('#' + boardId);

        this.timer = setInterval(this.tick.bind(this), 1000);

        $('.add-word', this.board).on('submit', this.handleSubmit.bind(this));
    }

    showWord(word) {
        $('.words', this.board).append($('<li>'. { text: word }));
    }

    showScore() {
        $('.score', this.board).text(this.score);
    }

    showMessage(msg, cls) {
        $(".msg", this.board)
        .text(msg)
        .removeClass()
        .addClass(`msg ${cls}`);
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        const $word = $('.word', this.board);
        
        let word = $word.val();
        if (!word) return;
        
        if  (this.words.has(word)) {
            this.showMessage(`Already found ${word}`, 'err');
            return;
        }

        const resp = await axious.get('/check-word' {params: {word: word}});
        if (resp.data.results === 'not-word') {
            this.showMessage(`${word} is not a valid English word`, 'err');
        }   else if (resp.data.result === "not-on-board") {
            this.showMessage(`${word} is not a valid word on this board`, 'err');
        }   else {
            this.showWord(word);
            this.score += word.length;
            this.showScore();
            this.words.add(word);
            this.showMessage(`Added: ${word}`, 'ok');
        }
    }
}