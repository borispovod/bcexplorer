'use strict';

var ZeroClipboard = window.ZeroClipboard;

angular.module('cryptichain')
  .directive('scroll', function ($window) {
      return function (scope, element, attrs) {
          angular.element($window).bind('scroll', function () {
              if (this.pageYOffset >= 200) {
                  scope.secondaryNavbar = true;
              } else {
                  scope.secondaryNavbar = false;
              }
              scope.$apply();
          });
      };
  })
  .directive('whenScrolled', function ($window) {
      return {
          restric: 'A',
          link: function (scope, elm, attr) {
              var pageHeight, clientHeight, scrollPos;
              $window = angular.element($window);

              var handler = function () {
                  pageHeight = window.document.documentElement.scrollHeight;
                  clientHeight = window.document.documentElement.clientHeight;
                  scrollPos = window.pageYOffset;

                  if (pageHeight - (scrollPos + clientHeight) === 0) {
                      scope.$apply(attr.whenScrolled);
                  }
              };

              $window.on('scroll', handler);

              scope.$on('$destroy', function () {
                  return $window.off('scroll', handler);
              });
          }
      };
  })
  .directive('clipCopy', function () {
      ZeroClipboard.config({
          moviePath: '/swf/ZeroClipboard.swf',
          trustedDomains: ['*'],
          allowScriptAccess: 'always',
          forceHandCursor: true
      });

      return {
          restric: 'A',
          scope: { clipCopy: '=clipCopy' },
          template: '<div class="tooltip fade right in"><div class="tooltip-arrow"></div><div class="tooltip-inner">Copied!</div></div>',
          link: function (scope, elm) {
              var clip = new ZeroClipboard(elm);

              clip.on('load', function (client) {
                  var onMousedown = function (client) {
                      client.setText(scope.clipCopy);
                  };

                  client.on('mousedown', onMousedown);

                  scope.$on('$destroy', function () {
                      client.off('mousedown', onMousedown);
                  });
              });

              clip.on('noFlash wrongflash', function () {
                  return elm.remove();
              });
          }
      };
  })
  .directive('osIcon', function () {
      return {
          restric: 'A',
          replace: true,
          template: '<span class="os-icon os-"></span>',
          link: function (scope, elm, attr) {
              elm[0].alt = elm[0].title = attr.os;
              elm[0].className = elm[0].className + attr.brand;
          }
      };
  });
