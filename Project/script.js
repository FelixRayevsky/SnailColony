

//коинсы
let coins = 0;

const earnButton = document.getElementById("earnButton");
const coinsCount = document.getElementById("coinsCount");
const coinsRateText = document.getElementById("coinsRate");
const clickRateText = document.getElementById("clickRate");
const oxygenCount = document.getElementById("oxygenCount");
const oxygenRateText = document.getElementById("oxygenRate");
const waterCount = document.getElementById("waterCount");
const waterRateText = document.getElementById("waterRate");
const foodCount = document.getElementById("foodCount");
const foodRateText = document.getElementById("foodRate");
let oxygen = 0;
let oxygenPerSecond = 0;
let water = 0;
let waterPerSecond = 0;
let food = 0;
let foodPerSecond = 0;

let clickPower = 1;

earnButton.addEventListener("click", function () {
    coins = coins + clickPower;
    coinsCount.textContent = Math.floor(coins);
    updateNavigationIndicators();
});


// Автоматическое производство монет
let coinsPerSecond = 0;


const snailTypes = [
    {
        id: 1,
        name: "Worker I",
        price: 100,
        income: 1,
        count: 0
    },
    {
        id: 2,
        name: "Worker II",
        price: 600,
        income: 5,
        count: 0
    },
    {
        id: 3,
        name: "Worker III",
        price: 3000,
        income: 20,
        count: 0
    },
    {
        id: 4,
        name: "Worker IV",
        price: 15000,
        income: 80,
        count: 0
    }
 ];

// Четыре уровня кислородных генераторов
const generatorTypes = [
    { id: 1, name: "Basic Generator", price: 150, production: 1, count: 0 },
    { id: 2, name: "Advanced Generator", price: 750, production: 5, count: 0 },
    { id: 3, name: "Industrial Generator", price: 3500, production: 20, count: 0 },
    { id: 4, name: "Oxygen Complex", price: 15000, production: 80, count: 0 }
];

// Четыре уровня вододобывающих установок
const extractorTypes = [
    { id: 1, name: "Basic Water Extractor", price: 200, production: 1, count: 0 },
    { id: 2, name: "Advanced Water Extractor", price: 1000, production: 5, count: 0 },
    { id: 3, name: "Industrial Water Extractor", price: 4500, production: 20, count: 0 },
    { id: 4, name: "Water Extraction Complex", price: 20000, production: 80, count: 0 }
];

// Улитки-переработчики: расходуют ресурс и зарабатывают монеты.
const oxygenSnailTypes = [
    { id: 1, name: "Oxygen Trader I", price: 250, consume: 1, income: 2, count: 0 },
    { id: 2, name: "Oxygen Trader II", price: 1200, consume: 5, income: 12, count: 0 },
    { id: 3, name: "Oxygen Trader III", price: 6000, consume: 20, income: 55, count: 0 },
    { id: 4, name: "Oxygen Trader IV", price: 25000, consume: 80, income: 240, count: 0 }
];

const waterSnailTypes = [
    { id: 1, name: "Water Trader I", price: 300, consume: 1, income: 3, count: 0 },
    { id: 2, name: "Water Trader II", price: 1500, consume: 5, income: 15, count: 0 },
    { id: 3, name: "Water Trader III", price: 7000, consume: 20, income: 70, count: 0 },
    { id: 4, name: "Water Trader IV", price: 30000, consume: 80, income: 300, count: 0 }
];

const foodSnailTypes = [
    { id: 1, name: "Food Trader I", price: 600, consume: 1, income: 4, count: 0 },
    { id: 2, name: "Food Trader II", price: 3000, consume: 5, income: 20, count: 0 },
    { id: 3, name: "Food Trader III", price: 12000, consume: 20, income: 90, count: 0 },
    { id: 4, name: "Food Trader IV", price: 50000, consume: 80, income: 400, count: 0 }
];

// Фермы перерабатывают воду и кислород в еду.
const farmTypes = [
    { id: 1, name: "Basic Hydroponic Farm", price: 500, consumeWater: 1, consumeOxygen: 1, production: 1, count: 0 },
    { id: 2, name: "Advanced Hydroponic Farm", price: 2500, consumeWater: 5, consumeOxygen: 5, production: 5, count: 0 },
    { id: 3, name: "Industrial Hydroponic Farm", price: 10000, consumeWater: 20, consumeOxygen: 20, production: 20, count: 0 },
    { id: 4, name: "Hydroponic Complex", price: 40000, consumeWater: 80, consumeOxygen: 80, production: 80, count: 0 }
];


setInterval(function () {
    runProductionTick();
    coinsCount.textContent = Math.floor(coins);
    oxygenCount.textContent = Math.floor(oxygen);
    waterCount.textContent = Math.floor(water);
    foodCount.textContent = Math.floor(food);
    clickRateText.textContent = "+" + clickPower;
}, 1000);


function updateNavigationIndicators() {
    // Есть ли доступное улучшение?
    const canBuyUpgrade =
        coins >= miningCost || coins >= nutritionCost;

    upgradeLink.classList.toggle(
        "available",
        canBuyUpgrade
    );

    // Можно ли купить хотя бы один вид улиток?
    const allSnailTypes = snailTypes.concat(oxygenSnailTypes, waterSnailTypes, foodSnailTypes);
    const canBuySnail = allSnailTypes.some(function (snail) {
        return coins >= snail.price;
    });

    snailsLink.classList.toggle(
        "available",
        canBuySnail
    );

    const canBuyBuilding = generatorTypes.some(function (generator) {
        return coins >= generator.price;
    }) || extractorTypes.some(function (extractor) {
        return coins >= extractor.price;
    }) || farmTypes.some(function (farm) {
        return coins >= farm.price;
    });

    buildingsLink.classList.toggle("available", canBuyBuilding);
}


// Переход между экранами
const gameArea = document.querySelector(".game-area");
const upgradeScreen = document.getElementById("upgradeScreen");
const snailsScreen = document.getElementById("snailsScreen");
const buildingsScreen = document.getElementById("buildingsScreen");

const colonyLink = document.getElementById("colonyLink");
const upgradeLink = document.getElementById("upgradeLink");
const snailsLink = document.getElementById("snailsLink");
const buildingsLink = document.getElementById("buildingsLink");

const menuItems = document.querySelectorAll(".menu-item");

function showScreen(screen, activeLink) {
    gameArea.style.display = "none";
    upgradeScreen.style.display = "none";
    snailsScreen.style.display = "none";
    buildingsScreen.style.display = "none";

    screen.style.display = "block";

    menuItems.forEach(function (item) {
        item.classList.remove("active");
    });

    activeLink.classList.add("active");
}

colonyLink.addEventListener("click", function (event) {
    event.preventDefault();
    showScreen(gameArea, colonyLink);
});

upgradeLink.addEventListener("click", function (event) {
    event.preventDefault();
    showScreen(upgradeScreen, upgradeLink);
});

snailsLink.addEventListener("click", function (event) {
    event.preventDefault();
    showScreen(snailsScreen, snailsLink);
});

buildingsLink.addEventListener("click", function (event) {
    event.preventDefault();
    showScreen(buildingsScreen, buildingsLink);
});






// Улучшение "Улучшенное питание"
    let nutritionLevel = 0;
    let nutritionCost = 250;

    const nutritionUpgrade = document.getElementById("nutritionUpgrade");
    const nutritionLevelText = document.getElementById("nutritionLevel");
    const nutritionCostText = document.getElementById("nutritionCost");
    const upgradeMessage = document.getElementById("upgradeMessage");


    nutritionUpgrade.addEventListener("click", function () {
        if (coins >= nutritionCost) {
            // Списываем монеты
            coins = coins - nutritionCost;

            // Повышаем уровень улучшения
            nutritionLevel = nutritionLevel + 1;
            updateSnailStats();

            // Увеличиваем пассивный доход
            coinsRateText.textContent = "+" + coinsPerSecond;

            // Повышаем цену следующей покупки на 70%
            nutritionCost = Math.round(nutritionCost * 1.7);

            // Обновляем информацию на экране
            coinsCount.textContent = Math.floor(coins);
            nutritionLevelText.textContent = "Lv. " + nutritionLevel;
            nutritionCostText.textContent = nutritionCost;

            // Показываем сообщение об успехе
            upgradeMessage.textContent = "Upgrade purchased!";
            upgradeMessage.style.color = "#70d68b";

            nutritionUpgrade.classList.add("purchased");
            updateNavigationIndicators();
        } else {
            // Если монет недостаточно
            upgradeMessage.textContent = "Not enough coins!";
            upgradeMessage.style.color = "#ff6b6b";
        }
    });


// Улучшение "Улучшенная добыча"
    let miningLevel = 0;
    let miningCost = 25;

    const miningUpgrade = document.getElementById("miningUpgrade");
    const miningLevelText = document.getElementById("miningLevel");
    const miningCostText = document.getElementById("miningCost");

    miningUpgrade.addEventListener("click", function () {
        if (coins >= miningCost) {
            // Списываем монеты
            coins = coins - miningCost;

            // Повышаем уровень и силу клика
            miningLevel = miningLevel + 1;
            clickPower = clickPower + 1;
            clickRateText.textContent = "+" + clickPower;

            // Повышаем цену следующей покупки
            miningCost = Math.round(miningCost * 1.5);

            // Обновляем интерфейс
            coinsCount.textContent = Math.floor(coins);
            miningLevelText.textContent = "Lv. " + miningLevel;
            miningCostText.textContent = miningCost;

            upgradeMessage.textContent = "Upgrade purchased!";
            upgradeMessage.style.color = "#70d68b";
            updateNavigationIndicators();
        } else {
            upgradeMessage.textContent = "Not enough coins!";
            upgradeMessage.style.color = "#ff6b6b";
        }
    });




function renderResourceSnailCards(types, containerId, prefix, resourceName) {
    const container = document.getElementById(containerId);
    container.innerHTML = types.map(function (snail) {
        return `<div class="snail-card">
            <div class="snail-card-icon">🐌</div>
            <div class="snail-card-info">
                <h3>${snail.name}</h3>
                <p>Consumes ${snail.consume} ${resourceName}/sec when active.</p>
                <span>+${snail.income} coins/sec</span>
                <span>Owned: <strong id="${prefix}${snail.id}Count">0</strong></span>
                <span>Price: <strong id="${prefix}${snail.id}Price">${snail.price}</strong> coins</span>
                <button class="buy-snail-button" id="buy${prefix}${snail.id}">Purchase</button>
            </div>
        </div>`;
    }).join("");
}

renderResourceSnailCards(oxygenSnailTypes, "oxygenSnailsList", "oxygenSnail", "oxygen");
renderResourceSnailCards(waterSnailTypes, "waterSnailsList", "waterSnail", "water");
renderResourceSnailCards(foodSnailTypes, "foodSnailsList", "foodSnail", "food");

function buyResourceSnail(snail, prefix) {
    if (coins < snail.price) {
        snailMessage.textContent = "Not enough coins!";
        snailMessage.style.color = "#ff6b6b";
        return;
    }
    coins -= snail.price;
    snail.count++;
    coinsCount.textContent = Math.floor(coins);
    document.getElementById(prefix + snail.id + "Count").textContent = snail.count;
    snailMessage.textContent = snail.name + " purchased!";
    snailMessage.style.color = "#70d68b";
    updateSnailStats();
    updateNavigationIndicators();
}

oxygenSnailTypes.forEach(function (snail) {
    document.getElementById("buyoxygenSnail" + snail.id).addEventListener("click", function () { buyResourceSnail(snail, "oxygenSnail"); });
});
waterSnailTypes.forEach(function (snail) {
    document.getElementById("buywaterSnail" + snail.id).addEventListener("click", function () { buyResourceSnail(snail, "waterSnail"); });
});
foodSnailTypes.forEach(function (snail) {
    document.getElementById("buyfoodSnail" + snail.id).addEventListener("click", function () { buyResourceSnail(snail, "foodSnail"); });
});

const totalSnailsText = document.getElementById("totalSnails");
const snailMessage = document.getElementById("snailMessage");

function updateSnailStats() {
    let totalSnails = 0;
    snailTypes.forEach(function (snail) {
        totalSnails += snail.count;
        document.getElementById("worker" + snail.id + "Count").textContent = snail.count;
    });

    oxygenSnailTypes.forEach(function (snail) { totalSnails += snail.count; });
    waterSnailTypes.forEach(function (snail) { totalSnails += snail.count; });
    foodSnailTypes.forEach(function (snail) { totalSnails += snail.count; });
    totalSnailsText.textContent = totalSnails;
}

function buySnail(snail) {
    if (coins >= snail.price) {
        coins -= snail.price;
        snail.count++;

        coinsCount.textContent = Math.floor(coins);

        updateSnailStats();
        updateNavigationIndicators();

        snailMessage.textContent = snail.name + " purchased!";
        snailMessage.style.color = "#70d68b";
    } else {
        snailMessage.textContent = "Not enough coins!";
        snailMessage.style.color = "#ff6b6b";
    }
}

snailTypes.forEach(function (snail) {
    document.getElementById("buyWorker" + snail.id).addEventListener(
        "click",
        function () {
            buySnail(snail);
        }
    );
});




// Покупка кислородных генераторов
const totalGeneratorsText = document.getElementById("totalGenerators");
const buildingMessage = document.getElementById("buildingMessage");

function updateGeneratorStats() {
    let totalGenerators = 0;
    oxygenPerSecond = 0;

    generatorTypes.forEach(function (generator) {
        totalGenerators += generator.count;
        oxygenPerSecond += generator.count * generator.production;

        document.getElementById("generator" + generator.id + "Owned").textContent = generator.count;
    });

    totalGeneratorsText.textContent = totalGenerators;
    oxygenRateText.textContent = "+" + oxygenPerSecond;
}

function buyGenerator(generator) {
    if (coins >= generator.price) {
        coins -= generator.price;
        generator.count++;
        coinsCount.textContent = Math.floor(coins);
        updateGeneratorStats();

        buildingMessage.textContent = generator.name + " purchased!";
        buildingMessage.style.color = "#70d68b";
    } else {
        buildingMessage.textContent = "Not enough coins!";
        buildingMessage.style.color = "#ff6b6b";
    }

    updateNavigationIndicators();
}

generatorTypes.forEach(function (generator) {
    document.getElementById("buyGenerator" + generator.id).addEventListener("click", function () {
        buyGenerator(generator);
    });
});


// Покупка вододобывающих установок
function updateExtractorStats() {
    let total = 0;
    waterPerSecond = 0;

    extractorTypes.forEach(function (extractor) {
        total += extractor.count;
        waterPerSecond += extractor.count * extractor.production;
        document.getElementById("extractor" + extractor.id + "Owned").textContent = extractor.count;
    });

    waterRateText.textContent = "+" + waterPerSecond;
}

function buyExtractor(extractor) {
    if (coins >= extractor.price) {
        coins -= extractor.price;
        extractor.count++;
        coinsCount.textContent = Math.floor(coins);
        updateExtractorStats();
        buildingMessage.textContent = extractor.name + " purchased!";
        buildingMessage.style.color = "#70d68b";
    } else {
        buildingMessage.textContent = "Not enough coins!";
        buildingMessage.style.color = "#ff6b6b";
    }

    updateNavigationIndicators();
}

extractorTypes.forEach(function (extractor) {
    document.getElementById("buyExtractor" + extractor.id).addEventListener("click", function () {
        buyExtractor(extractor);
    });
});


const farmContainer = document.getElementById("farmBuildingsList");
farmContainer.innerHTML = farmTypes.map(function (farm) {
    return `<div class="building-card">
        <img src="assets/buildings.png" alt="${farm.name}">
        <div class="building-info">
            <h3>${farm.name}</h3>
            <p>Uses water and oxygen to grow food.</p>
            <span>-${farm.consumeWater} water/sec, -${farm.consumeOxygen} oxygen/sec</span>
            <span>+${farm.production} food/sec</span>
            <p>Owned: <strong id="farm${farm.id}Owned">0</strong></p>
            <p>Price: <strong id="farm${farm.id}Price">${farm.price}</strong> coins</p>
            <button id="buyFarm${farm.id}">Purchase</button>
        </div>
    </div>`;
}).join("");

farmTypes.forEach(function (farm) {
    document.getElementById("buyFarm" + farm.id).addEventListener("click", function () {
        if (coins >= farm.price) {
            coins -= farm.price;
            farm.count++;
            coinsCount.textContent = Math.floor(coins);
            buildingMessage.textContent = farm.name + " purchased!";
            buildingMessage.style.color = "#70d68b";
        } else {
            buildingMessage.textContent = "Not enough coins!";
            buildingMessage.style.color = "#ff6b6b";
        }
        updateNavigationIndicators();
    });
});

function activeUnits(count, consumption, resourceAmount) {
    if (consumption <= 0) return count;
    return Math.min(count, Math.floor((resourceAmount + 1e-9) / consumption));
}

function runProductionTick() {
    // Запоминаем запасы, чтобы показать фактический чистый прирост за секунду.
    const oxygenBefore = oxygen;
    const waterBefore = water;
    const foodBefore = food;

    // Сначала добываем кислород и воду.
    oxygen += oxygenPerSecond;
    water += waterPerSecond;

    let earnedCoins = 0;
    const nutritionMultiplier = 1 + nutritionLevel * 0.3;

    // Затем фермы используют воду и кислород, производя еду.
    farmTypes.forEach(function (farm) {
        const active = Math.min(
            farm.count,
            activeUnits(farm.count, farm.consumeWater, water),
            activeUnits(farm.count, farm.consumeOxygen, oxygen)
        );
        water -= active * farm.consumeWater;
        oxygen -= active * farm.consumeOxygen;
        food += active * farm.production;
    });

    // Базовые рабочие улитки всегда приносят монеты.
    snailTypes.forEach(function (snail) {
        earnedCoins += snail.count * snail.income * nutritionMultiplier;
    });

    // Остальные улитки активны только при наличии нужного ресурса.
    [[oxygenSnailTypes, "oxygen"], [waterSnailTypes, "water"], [foodSnailTypes, "food"]].forEach(function (group) {
        const types = group[0];
        const resource = group[1];
        types.forEach(function (snail) {
            const amount = resource === "oxygen" ? oxygen : resource === "water" ? water : food;
            const active = activeUnits(snail.count, snail.consume, amount);
            const consumed = active * snail.consume;
            if (resource === "oxygen") oxygen -= consumed;
            else if (resource === "water") water -= consumed;
            else food -= consumed;
            earnedCoins += active * snail.income * nutritionMultiplier;
        });
    });

    // Защита от крошечных отрицательных значений из-за округления.
    oxygen = Math.max(0, oxygen);
    water = Math.max(0, water);
    food = Math.max(0, food);
    coins += earnedCoins;
    coinsPerSecond = earnedCoins;
    foodPerSecond = food - foodBefore;
    coinsRateText.textContent = "+" + Number(coinsPerSecond.toFixed(2));
    oxygenRateText.textContent = (oxygen - oxygenBefore >= 0 ? "+" : "") + Number((oxygen - oxygenBefore).toFixed(2));
    waterRateText.textContent = (water - waterBefore >= 0 ? "+" : "") + Number((water - waterBefore).toFixed(2));
    foodRateText.textContent = (foodPerSecond >= 0 ? "+" : "") + Number(foodPerSecond.toFixed(2));

    if (typeof totalSnailsText !== "undefined") {
        totalSnailsText.textContent = snailTypes.concat(oxygenSnailTypes, waterSnailTypes, foodSnailTypes).reduce(function (sum, snail) { return sum + snail.count; }, 0);
    }
    [...oxygenSnailTypes.map(s => [s, "oxygenSnail"]), ...waterSnailTypes.map(s => [s, "waterSnail"]), ...foodSnailTypes.map(s => [s, "foodSnail"])].forEach(function (entry) {
        document.getElementById(entry[1] + entry[0].id + "Count").textContent = entry[0].count;
    });
    farmTypes.forEach(function (farm) { document.getElementById("farm" + farm.id + "Owned").textContent = farm.count; });
}

const upgradeNotifications = document.getElementById(
    "upgradeNotifications"
);


let currentNotificationName = "";

function updateUpgradeNotifications() {
    let availableUpgrade = null;

    if (coins >= miningCost) {
        availableUpgrade = {
            name: "Improved Mining",
            description: "Earn more coins with every click.",
            cost: miningCost,
            button: miningUpgrade
        };
    } else if (coins >= nutritionCost) {
        availableUpgrade = {
            name: "Improved Nutrition",
            description: "Increase the income of all your snails.",
            cost: nutritionCost,
            button: nutritionUpgrade
        };
    }

    if (availableUpgrade === null) {
        upgradeNotifications.innerHTML = "";
        currentNotificationName = "";
        return;
    }

    // Не пересоздаём карточку, если показываем то же улучшение
    if (currentNotificationName === availableUpgrade.name) {
        const costText = upgradeNotifications.querySelector(
            ".notification-cost"
        );

        costText.textContent = "🪙 " + availableUpgrade.cost + " coins";
        return;
    }

    currentNotificationName = availableUpgrade.name;

    upgradeNotifications.innerHTML = `
        <div class="upgrade-notification">
            <h3>Upgrade available!</h3>
            <p>
                <strong>${availableUpgrade.name}</strong><br>
                ${availableUpgrade.description}
            </p>
            <div class="notification-cost">
                🪙 ${availableUpgrade.cost} coins
            </div>
            <button id="quickUpgradeButton">
                Купить улучшение
            </button>
        </div>
    `;

    document.getElementById("quickUpgradeButton")
        .addEventListener("click", function () {
            availableUpgrade.button.click();
            updateUpgradeNotifications();
        });
}


// Проверяем доступность улучшений раз в секунду
setInterval(function () {
    updateUpgradeNotifications();
    updateNavigationIndicators();
}, 1000);


updateUpgradeNotifications();
updateNavigationIndicators();
