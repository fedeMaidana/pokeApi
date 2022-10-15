const LINK = (name) => document.querySelector(name);

let inputSearch = LINK('.header__seeker__input')
let buttonSearch = LINK('.header__seeker__button');

let h1 = LINK('h1');

let mainContainer = LINK('.main');

let arrowLeft = LINK('#main__arrow--left');
let arrowRight = LINK('#main__arrow--right');
let mobileArrowLeft = LINK('#main__mobile__arrow--left');
let mobileArrowRight = LINK('#main__mobile__arrow--right');

let img = LINK('.main__poke__img');

let typesContainer = LINK('.main__poke__types');

let canvasGraph = LINK('#canvas__graph');

let description = LINK('.secondary__description__text');

let height = LINK('#secondary__info__container--height span');

let weight = LINK('#secondary__info__container--weight span')

let sex = LINK('#secondary__info__container--gender span');
let icon1 = LINK('#secondary__info__container__gender__male-icon');
let icon2 = LINK('#secondary__info__container__gender__female-icon');
let unknown1 = LINK('#secondary__info__container__gender__text--unknown1');

let category = LINK('#secondary__info__container__category__text');

let abilityClass = LINK('#secondary__info__container--skills');
let abilityContainer = LINK('.secondary__info__container__skills__results');

let hiddenAbilityContainer = LINK('#secondary__info__container--hidden-ability');
let hiddenAbilities = LINK('.secondary__info__container__hidden-ability__results');

let enduranceContainer = LINK('.secondary__qualities__endurance__types');

let weaknessContainer = LINK('.secondary__qualities__weakness__types');

let immunityContainer = LINK('.secondary__qualities__immunity__types');