document.addEventListener('DOMContentLoaded', () => {

    const dictionary = {
        "credit": {
            "ru": "Банк: ",
            "en": "Credit: "
        },
        "bet": {
            "ru": "Ставка: ",
            "en": "Bet: "
        },
        "put": {
            "ru": "Сделай ",
            "en": "Put "
        },
        "money": {
            "ru": "ставку",
            "en": "your money"
        },
        "begin_btn": {
            "ru": "Начать с этой ставкой",
            "en": "Start with it"
        },
        "card_btn": {
            "ru": "Еще одну карту",
            "en": "One more card"
        },
        "double_btn": {
            "ru": "Удвоиться и последнюю карту",
            "en": "Double money and last card"
        },
        "dealer_btn": {
            "ru": "Смотреть карты дилера",
            "en": "Show dealer hand"
        },
        "win": {
            "ru": "Ты выиграл!",
            "en": "You win!"
        },
        "lose": {
            "ru": "Ты проиграл!",
            "en": "You lose!"
        },
        "deal": {
            "ru": "Ничья!",
            "en": "Deal!"
        },
        "continue": {
            "ru": "Продолжить",
            "en": "Continue the game"
        },
        "your_points": {
            "ru": "Твои очки: ",
            "en": "Your points: "
        },
        "dealer_points": {
            "ru": "Очки дилера: ",
            "en": "Dealer points: "
        }
    }

    const picFormat = {
        "regular": "svg",
        "wars_of_roses": "png"
    }

    let random_number_of_suit, random_number_of_card, random_card, length_of_this_suit, real_cards, suits, my_hand, his_hand, pointsTable, countOfAces, countOfHisAces;
    let container_with_my_cards = document.querySelector("#my_card");
    let container_with_his_cards = document.querySelector("#his_card");

    let myHandDivs, hisHandDivs;

    const container_with_money = document.querySelector("#container_with_money");
    const plus_minus_buttons = document.querySelector("#plus_minus_buttons");
    const bank = document.querySelector("#bank");
    const my_bet = document.querySelector("#my_bet");
    const money_str = document.querySelector("#money_str");
    const bet_str = document.querySelector("#bet_str");

    const money_span = document.querySelector("#money_span");
    const bet_span = document.querySelector("#bet_span");

    const plus = document.querySelector("#plus");
    const minus = document.querySelector("#minus");

    money_str.remove();
    bet_str.remove();

    plus.remove();
    minus.remove();
    let win_or_lose_2 = document.querySelector("#win_or_lose_2");
    win_or_lose_2.remove();


    const info_options = document.querySelector("#info_options");

    let language, set;

    let allMoney = 100;
    let currentBet = 5;

    const scoreDisplay = document.querySelector("#score");
    const numberOfScore = document.querySelector("#counter_of_points");

    const scoreDilerDisplay = document.querySelector("#diler_score");
    const numberOfDilerScore = document.querySelector("#counter_of_diler_points");

    const his_score_display = document.querySelector("#his_score_display");
    his_score_display.remove();
    const my_score_display = document.querySelector("#my_score_display");
    my_score_display.remove();
    const his_display_container = document.querySelector("#his_display_container");
    const my_display_container = document.querySelector("#my_display_container");

    let my_score, his_score;

    let doubleBtn = document.createElement("button");
    let newBtn = document.createElement("button");
    let newCardBtn = document.createElement("button");
    let firstBet = document.createElement("button");
    let continueBtn = document.createElement("button");

    let startBtn_2 = document.querySelector("#start_button_2");
    let startBtn_3 = document.querySelector("#start_button_3");
    let startBtn_1 = document.querySelector("#start_button_1");

    let my_container = document.querySelector("#my_container");
    let gameBegin = document.querySelector("#game_begin");

    const languageDisplay = document.querySelector("#language");
    const russian = document.querySelector("#russian");
    const english = document.querySelector("#english");
    const deck = document.querySelector("#deck");
    const regular = document.querySelector("#regular");
    const retro = document.querySelector("#retro");


    function beginTheGame() {

        my_score_display.remove();
        his_score_display.remove();

        if (typeof language === "undefined") {
            language = document.querySelector('input[name="language"]:checked').value;
            set = document.querySelector('input[name="set"]:checked').value;
        }
        money_span.textContent = dictionary["credit"][language];
        bet_span.textContent = dictionary["bet"][language];

        // console.log("2Язык получился такой " + language);
        // console.log("2Колода получился такой " + set);

        soundBegin();
        container_with_money.append(money_str);
        container_with_money.append(bet_str);
        container_with_money.append(minus);
        container_with_money.append(plus);

        info_options.remove();
        container_with_money.classList.remove("container_with_money");

        scoreDisplay.textContent = dictionary["put"][language];

        numberOfScore.textContent = dictionary["money"][language];
        container_with_my_cards.innerHTML = "";
        container_with_his_cards.innerHTML = "";

        scoreDilerDisplay.textContent = dictionary["put"][language];
        numberOfDilerScore.textContent = dictionary["money"][language];

        continueBtn.remove();

        gameBegin.remove();


        win_or_lose_2.remove();

        firstBet.textContent = dictionary["begin_btn"][language];
        firstBet.classList.add("buttons_in_start");
        startBtn_1.append(firstBet);

        currentBet = 0;
        my_bet.textContent = currentBet;

        if (allMoney >= 5) {
            allMoney -= 5;
            bank.textContent = allMoney;
            currentBet = 5;
            my_bet.textContent = currentBet;
        }
    }

    function touchPlus() {
        if (currentBet < 20) {
            allMoney--;
            currentBet++;
            bank.textContent = allMoney;
            my_bet.textContent = currentBet;
        }

    }

    function touchMinus() {
        if (currentBet > 1) {
            allMoney++;
            currentBet--;
            bank.textContent = allMoney;
            my_bet.textContent = currentBet;
        }
    }

    function removeButtonsAndNewStart() {

        bank.textContent = allMoney;

        bet_str.remove();
        newBtn.remove();
        newCardBtn.remove();
        doubleBtn.remove();

        container_with_money.append(win_or_lose_2);

        continueBtn.textContent = dictionary["continue"][language];
        continueBtn.classList.add("button");
        container_with_money.append(continueBtn);
    }


    function giveRandomCard(whose_hand) {
        random_number_of_suit = Math.floor(Math.random() * 4);
        length_of_this_suit = real_cards[suits[random_number_of_suit]].length;
        random_number_of_card = Math.floor(Math.random() * length_of_this_suit);
        random_card = `url(images/decks/${set}/${real_cards[suits[random_number_of_suit]][random_number_of_card]}_of_${suits[random_number_of_suit]}.${picFormat[set]})`;
        whose_hand.push(...real_cards[suits[random_number_of_suit]].splice(random_number_of_card, 1));
    }

    function calculatePoints() {
        my_score = 0;
        countOfAces = 0;

        for (let i = 0; i < my_hand.length; i++) {
            my_score += pointsTable[my_hand[i]];
            if (my_hand[i] === 14) {
                countOfAces++;
            };

        }
        numberOfScore.textContent = my_score;

        if (my_score > 21) {
            if (countOfAces > 0) {
                for (let i = 0; i < countOfAces && my_score > 21; i++) {
                    my_score -= 10;
                }
                numberOfScore.textContent = my_score;

            }
            if (my_score > 21) {
                win_or_lose_2.textContent = dictionary["lose"][language];
                newCardBtn.removeEventListener('click', getNewCardForMe);
                removeButtonsAndNewStart();
                continueBtn.addEventListener('click', beginTheGame);
            }
        }

        // console.log("количество очков = " + my_score);
        // console.log("количество тузов = " + countOfAces);
    }

    function getNewCardForHim() {

        giveRandomCard(his_hand);

        if (his_hand.length !== 2) {
            container_with_his_cards.innerHTML += `<div class=\"add_to_him\" id=\"his_card_${his_hand.length}\"></div>`;
        }

        if (his_hand.length === 1) {
            container_with_his_cards.innerHTML += `<div class=\"add_to_him\" id=\"his_card_${his_hand.length + 1}\"></div>`;
        }

        hisHandDivs = Array.from(document.querySelectorAll(".add_to_him"));
        hisHandDivs[his_hand.length - 1].style.backgroundImage = random_card;

        if (his_hand.length === 1) {
            hisHandDivs[his_hand.length].style.backgroundImage = `url(images/decks/${set}/cover.${picFormat[set]})`;
        }
        // console.log(hisHandDivs);
        // console.log(his_hand);
        // console.log(real_cards);
    }


    function getNewCardForMe() {

        giveRandomCard(my_hand);
        container_with_my_cards.innerHTML += `<div class=\"add_to\" id=\"my_card_${my_hand.length}\"></div>`;
        myHandDivs = Array.from(document.querySelectorAll(".add_to"));
        // console.log(myHandDivs);

        myHandDivs[my_hand.length - 1].style.backgroundImage = random_card;
        calculatePoints();

        // console.log(my_score);
        // console.log(my_hand);
        // console.log(real_cards);
        if (my_hand.length > 1) { soundClickForMyCard(); };
        if (my_score === 21) {
            newCardBtn.remove();
            doubleBtn.remove();
        }
    }

    function addButton() {
        doubleBtn.textContent = dictionary["double_btn"][language];
        doubleBtn.classList.add("buttons_in_start");
        firstBet.replaceWith(doubleBtn);

        newBtn.textContent = dictionary["dealer_btn"][language];
        newBtn.classList.add("buttons_in_start");

        newCardBtn.textContent = dictionary["card_btn"][language];
        newCardBtn.classList.add("buttons_in_start");
        startBtn_2.append(newBtn);
        startBtn_3.append(newCardBtn);
    }

    gameBegin.addEventListener('click', beginTheGame);

    function getFirstBet() {
        my_display_container.append(my_score_display);
        scoreDisplay.textContent = dictionary["your_points"][language];
        numberOfScore.textContent = "";
        plus_minus_buttons.innerHTML = "";
        addButton();

        plus.remove();
        minus.remove();

        my_hand = [];
        his_hand = [];

        real_cards = {
            diamonds: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            spades: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            clubs: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            hearts: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

        }

        pointsTable = {
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10,
            11: 10,
            12: 10,
            13: 10,
            14: 11
        }

        suits = Object.keys(real_cards);

        getNewCardForMe();
        getNewCardForMe();
        getNewCardForHim();

        if (my_score < 21) {


            newCardBtn.addEventListener('click', getNewCardForMe);
        }

    }

    firstBet.addEventListener('click', getFirstBet);
    plus.addEventListener('click', touchPlus);
    minus.addEventListener('click', touchMinus);

    function stopGivingCards() {
        his_display_container.append(his_score_display);
        getNewCardForHim();
        scoreDilerDisplay.textContent = dictionary["dealer_points"][language];
        numberOfDilerScore.textContent = "";
        calculateHisPoints();
        while (his_score < my_score) {
            getNewCardForHim();
            calculateHisPoints();
        }
        soundClickForHisCard();
        removeButtonsAndNewStart();
        continueBtn.addEventListener('click', beginTheGame);
        // console.log("Его очки: " + his_score);
        // console.log("Мои очки: " + my_score);
    }

    function calculateHisPoints() {
        his_score = 0;
        countOfHisAces = 0;

        for (let i = 0; i < his_hand.length; i++) {
            his_score += pointsTable[his_hand[i]];
            if (his_hand[i] === 14) {
                countOfHisAces++;
            };

        }
        if (his_score > 21) {
            if (countOfHisAces > 0) {
                for (let i = 0; i < countOfHisAces && his_score > 21; i++) {
                    his_score -= 10;
                }

            }
            if (his_score > 21) {
                removeButtonsAndNewStart();
                win_or_lose_2.textContent = dictionary["win"][language];
                allMoney = allMoney + 2 * currentBet;
                continueBtn.addEventListener('click', beginTheGame);
            }
        }

        if (his_score > my_score && his_score < 22) {
            removeButtonsAndNewStart();
            win_or_lose_2.textContent = dictionary["lose"][language];
        }

        if (his_score === my_score) {
            removeButtonsAndNewStart();
            win_or_lose_2.textContent = dictionary["deal"][language];
            allMoney = allMoney + currentBet;
        }
        numberOfDilerScore.textContent = his_score;
    }


    newBtn.addEventListener('click', stopGivingCards);

    function doubleAndShow() {
        getNewCardForMe();
        newCardBtn.remove();
        doubleBtn.remove();
        allMoney -= currentBet;
        currentBet = currentBet * 2;
        bank.textContent = allMoney;
        my_bet.textContent = currentBet;
    }

    function soundClickForMyCard() {
        var audio = new Audio();
        audio.src = "sounds/2.mp3";
        audio.autoplay = true;
    }

    function soundBegin() {
        var audio = new Audio();
        audio.src = "sounds/sborka.mov";
        audio.autoplay = true;
    }

    function soundClickForHisCard() {
        var audio = new Audio();
        audio.src = "sounds/1.mp3";
        audio.autoplay = true;
    }

    function changeLanguageOnEnglish() {
        gameBegin.textContent = "Begin the game";
        languageDisplay.textContent = "Language";
        deck.textContent = "Deck of cards";
        regular.textContent = "Regular";
        retro.textContent = "Vintage";
    }

    function changeLanguageOnRussian() {
        gameBegin.textContent = "Начать игру";
        languageDisplay.textContent = "Язык";
        deck.textContent = "Карточная колода";
        regular.textContent = "Обычная";
        retro.textContent = "Ретро";
    }

    english.addEventListener('click', changeLanguageOnEnglish);
    russian.addEventListener('click', changeLanguageOnRussian);
    doubleBtn.addEventListener('click', doubleAndShow);
})