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

let pokemonTypes = LINK('.main__poke__types');
let pokemonType1 = LINK('#main__poke__types__type-1');
let pokemonType1Text = LINK('#main__poke__types__text-1');
let pokemonType2 = LINK('#main__poke__types__type-2');
let pokemonType2Text = LINK('#main__poke__types__text-2');

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
let ability = LINK('.secondary__info__container__skills__results');
let pokeAbility1 = LINK('#secondary__info__container__skills__results--ability-1');
let pokeAbility2 = LINK('#secondary__info__container__skills__results--ability-2');

let hiddenAbilityContainer = LINK('#secondary__info__container--hidden-ability');
let hiddenAbilities = LINK('.secondary__info__container__hidden-ability__results');
let hiddenAbilityTextNone = LINK('#secondary__info__container__hidden-ability__results__text-none');
let hiddenAbilityText = LINK('#secondary__info__container__hidden-ability__results__text');

let enduranceContainer = LINK('.secondary__qualities__endurance');
let typesContainer = LINK('.secondary__qualities__endurance__types');
let enduranceTypeNone = LINK('#qualities__endurance__types__type-none');
let enduranceTextNone = LINK('#qualities__endurance__types__text-none');
let type1 = LINK('#qualities__endurance__types__type-1');
let type2 = LINK('#qualities__endurance__types__type-2');
let type3 = LINK('#qualities__endurance__types__type-3');
let type4 = LINK('#qualities__endurance__types__type-4');
let type5 = LINK('#qualities__endurance__types__type-5');
let type6 = LINK('#qualities__endurance__types__type-6');
let type7 = LINK('#qualities__endurance__types__type-7');
let type8 = LINK('#qualities__endurance__types__type-8');
let type9 = LINK('#qualities__endurance__types__type-9');
let type10 = LINK('#qualities__endurance__types__type-10');
let type11 = LINK('#qualities__endurance__types__type-11');
let text1 = LINK('#qualities__endurance__types__text-1');
let text2 = LINK('#qualities__endurance__types__text-2');
let text3 = LINK('#qualities__endurance__types__text-3');
let text4 = LINK('#qualities__endurance__types__text-4');
let text5 = LINK('#qualities__endurance__types__text-5');
let text6 = LINK('#qualities__endurance__types__text-6');
let text7 = LINK('#qualities__endurance__types__text-7');
let text8 = LINK('#qualities__endurance__types__text-8');
let text9 = LINK('#qualities__endurance__types__text-9');
let text10 = LINK('#qualities__endurance__types__text-10');
let text11 = LINK('#qualities__endurance__types__text-11');

let typesContainerWeakness = LINK('.secondary__qualities__weakness__types');
let weaknessType1 = LINK('#qualities__weakness__types__type-1');
let weaknessText1 = LINK('#qualities__weakness__types__text-1');
let weaknessType2 = LINK('#qualities__weakness__types__type-2');
let weaknessText2 = LINK('#qualities__weakness__types__text-2');
let weaknessType3 = LINK('#qualities__weakness__types__type-3');
let weaknessText3 = LINK('#qualities__weakness__types__text-3');
let weaknessType4 = LINK('#qualities__weakness__types__type-4');
let weaknessText4 = LINK('#qualities__weakness__types__text-4');
let weaknessType5 = LINK('#qualities__weakness__types__type-5');
let weaknessText5 = LINK('#qualities__weakness__types__text-5');
let weaknessType6 = LINK('#qualities__weakness__types__type-6');
let weaknessText6 = LINK('#qualities__weakness__types__text-6');
let weaknessType7 = LINK('#qualities__weakness__types__type-7');
let weaknessText7 = LINK('#qualities__weakness__types__text-7');

let typesContainerImmunity = LINK('.secondary__qualities__immunity__types');
let immnunityTypeNone = LINK('#qualities__immunity__types__type-none');
let immnunityTextNone = LINK('#qualities__immunity__types__text-none');
let immnunityType1 = LINK('#qualities__immunity__types__type-1');
let immnunityText1 = LINK('#qualities__immunity__types__text-1');
let immnunityType2 = LINK('#qualities__immunity__types__type-2');
let immnunityText2 = LINK('#qualities__immunity__types__text-2');
let immnunityType3 = LINK('#qualities__immunity__types__type-3');
let immnunityText3 = LINK('#qualities__immunity__types__text-3');