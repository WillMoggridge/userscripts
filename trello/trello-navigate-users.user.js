// ==UserScript==
// @name Trello - Navigate Users
// @namespace will@moggridge.com
// @description Navigate users on Trello with some simple controls.
// @license LGPL-3.0
// @version 1
// @include https://trello.com/b/*
// @grant none
// ==/UserScript==

window.addEventListener('load', () => {
  const nextButton = $('<a class="board-header-btn board-header-btn-filter-indicator">Next User</a>');
  const userIndicator = $('<a class="board-header-btn"></a>');
  const prevButton = $('<a class="board-header-btn board-header-btn-filter-indicator">Prev User</a>');
  const easterEgg = $('<img src="#" style="position: fixed; bottom: 15px; left: 5px;">');

  function easterIsHere(name) {
    if (name.includes('peter_mahnke')) {
      easterEgg.attr('src', 'https://pldh.net/media/pokemon/shuffle/056.png');
      $('.board-header-btn.perms-btn').after(easterEgg);
    } else {
      easterEgg.remove();
    }
  }

  function resetFilter() {
    let activeExists = false;
    do {
      const active = $('.js-mem-list .js-member-item.active a');
      active.click();
      activeExists = (active.length - 1 > 0);
    } while (activeExists);
  }

  function changeUser(i) {
    $('.js-open-card-filter').click();
    $('.js-show-all-members').click();

    let next = $(`.js-mem-list .js-member-item:nth('${i}') a`);
    if (next.length) {
      resetFilter();
      next = $(`.js-mem-list .js-member-item:nth('${i}') a`);
      userIndicator.text(next.text());
      easterIsHere(next.text());
      next.click();
    }
    return false;
  }

  function getCurrentUserIndex() {
    const current = $('.js-mem-list .js-member-item.active:first');
    if (current.length) {
      return current.index();
    }
    return false;
  }

  function nextUser() {
    $('.js-open-card-filter').click();
    $('.js-show-all-members').click();

    const currentIndex = getCurrentUserIndex();
    let index = 0;
    if (currentIndex !== $('.js-mem-list .js-member-item:last').index()) {
      index = currentIndex + 1;
    }
    changeUser(index);
  }

  function prevUser() {
    $('.js-open-card-filter').click();
    $('.js-show-all-members').click();

    const currentIndex = getCurrentUserIndex();
    let index;
    if (currentIndex !== false || currentIndex !== 0) {
      index = currentIndex - 1;
    } else {
      index = $('.js-mem-list .js-member-item:last').index();
    }
    changeUser(index);
  }

  nextButton.click(nextUser);
  prevButton.click(prevUser);
  $('.board-header-btn.perms-btn').after(userIndicator);
  $('.board-header-btn.calendar-btn').before(prevButton, nextButton);
  changeUser(getCurrentUserIndex())
}, false);
