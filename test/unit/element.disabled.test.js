define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  '../helper/supports',
  'ally/element/disabled',
], function(registerSuite, expect, customFixture, supports, elementDisabled) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'element/disabled',

      beforeEach: function() {
        fixture = customFixture([
          /*eslint-disable indent */
          '<div tabindex="0" id="non-input"></div>',
          '<input type="text" id="input">',
          /*eslint-enable indent */
        ].join(''));
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          elementDisabled(null);
        }).to.throw(TypeError, 'element/disabled requires an argument of type Element');
      },
      'non-input': function() {
        var element = document.getElementById('non-input');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(false, 'before disable');

        elementDisabled(element, true);
        expect(element.hasAttribute('data-ally-disabled')).to.equal(true, 'after disable');

        elementDisabled(element, false);
        expect(element.hasAttribute('data-ally-disabled')).to.equal(false, 'after disable undo');
      },
      input: function() {
        var element = document.getElementById('input');
        expect(element.disabled).to.equal(false, 'before disable');

        elementDisabled(element, true);
        expect(element.disabled).to.equal(true, 'after disable');

        elementDisabled(element, false);
        expect(element.disabled).to.equal(false, 'after disable undo');
      },
      'non-input - getter': function() {
        var element = document.getElementById('non-input');
        expect(elementDisabled(element)).to.equal(false, 'before disable');

        elementDisabled(element, true);
        expect(elementDisabled(element)).to.equal(true, 'after disable');

        elementDisabled(element, false);
        expect(elementDisabled(element)).to.equal(false, 'after disable undo');
      },
      'input - getter': function() {
        var element = document.getElementById('input');
        expect(elementDisabled(element)).to.equal(false, 'before disable');

        elementDisabled(element, true);
        expect(elementDisabled(element)).to.equal(true, 'after disable');

        elementDisabled(element, false);
        expect(elementDisabled(element)).to.equal(false, 'after disable undo');
      },
      'disable does not add data-ally-disabled to input': function() {
        var element = document.getElementById('input');
        expect(element.hasAttribute('tabindex')).to.equal(false, 'before disable');

        elementDisabled(element, true);
        expect(elementDisabled(element)).to.equal(true, 'after disable');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(false, 'after disable');

        elementDisabled(element, false);
        expect(element.hasAttribute('tabindex')).to.equal(false, 'after disable undo');
      },
      'disable restores tabindex="0"': function() {
        var element = document.getElementById('non-input');
        expect(element.getAttribute('tabindex')).to.equal('0', 'before disable');

        elementDisabled(element, true);
        expect(element.getAttribute('tabindex')).to.equal('-1', 'after disable');

        elementDisabled(element, false);
        expect(element.getAttribute('tabindex')).to.equal('0', 'after disable undo');
      },
      'disable adds aria-disabled="true"': function() {
        var element = document.getElementById('non-input');
        expect(element.hasAttribute('aria-disabled')).to.equal(false, 'before disable');

        elementDisabled(element, true);
        expect(element.getAttribute('aria-disabled')).to.equal('true', 'after disable');

        elementDisabled(element, false);
        expect(element.hasAttribute('aria-disabled')).to.equal(false, 'after disable undo');
      },
      'disable restores aria-disabled="false"': function() {
        var element = document.getElementById('non-input');
        element.setAttribute('aria-disabled', 'false');
        expect(element.getAttribute('aria-disabled')).to.equal('false', 'before disable');

        elementDisabled(element, true);
        expect(element.getAttribute('aria-disabled')).to.equal('true', 'after disable');

        elementDisabled(element, false);
        expect(element.getAttribute('aria-disabled')).to.equal('false', 'after disable undo');
      },
      'disable prevents element.focus()': function() {
        var element = document.getElementById('non-input');
        expect(element.focus === HTMLElement.prototype.focus).to.equal(true, 'before disable');

        elementDisabled(element, true);
        expect(element.focus === HTMLElement.prototype.focus).to.equal(false, 'after disable');

        elementDisabled(element, false);
        expect(element.focus === HTMLElement.prototype.focus).to.equal(true, 'after disable undo');
      },
      'disable prevents pointer events': function() {
        var element = document.getElementById('non-input');
        expect(element.style.pointerEvents).to.equal('', 'before disable');

        elementDisabled(element, true);
        expect(element.style.pointerEvents).to.equal('none', 'after disable');

        elementDisabled(element, false);
        expect(element.style.pointerEvents).to.equal('', 'after disable undo');
      },
      'disable removes video controls': function() {
        var element = fixture.add('<video controls src="data:video/mp4;base64,video-focus-test"></audio>').firstElementChild;
        expect(element.hasAttribute('controls')).to.equal(true, 'before disable');

        elementDisabled(element, true);
        expect(element.hasAttribute('controls')).to.equal(false, 'after disable');

        elementDisabled(element, false);
        expect(element.hasAttribute('controls')).to.equal(true, 'after disable undo');
      },
    };
  });
});
