angular.module('themeServiceModule', [])

    .factory('themeFactory', function (){
        var Theme = (function() {
            var sidePanel = (function(){
                function SidePanel() {
                    this.main = {
                        backgroundColor: "",
                        color: "",
                        borderColor: ""};
                    this.menu = {
                        color: "",
                        borderColor: ""};
                    this.menuActive = {
                        color: "",
                        backgroundColor: ""}
                }
                SidePanel.prototype = {
                    setMainBackgroundColor: function(color){ this.main.backgroundColor = color; },
                    setMainColor: function(color){ this.main.color = color; },
                    setMainBorderColor: function(color){ this.main.borderColor = color; },
                    setMenuBorderColor: function(color){ this.menu.borderColor = color; },
                    setMenuActiveColor: function(color){ this.menuActive.color = color; },
                    setMenuActiveBackgroundColor: function(color){ this.menuActive.backgroundColor = color; }
                };

                return SidePanel
            })();
            var topPanel = (function(){
                function TopPanel() {
                    this.main = {
                        backgroundColor: "",
                        borderColor: ""};
                    this.boardIcon = {
                        color: ""};
                    this.boardIconActive = {
                        color: "",
                        backgroundColor: "",
                        borderColor:""}
                }
                TopPanel.prototype = {
                    setMainBackgroundColor: function(color){ this.main.backgroundColor = color; },
                    setMainBorderColor: function(color){ this.main.borderColor = color; },
                    setBorderIconColor: function(color){ this.boardIcon.color = color; },
                    setBorderIconActiveColor: function(color){ this.boardIconActive.color = color; },
                    setBorderIconActiveBackgroundColor: function(color){ this.boardIconActive.backgroundColor = color; },
                    setBorderIconActiveBorderColor: function(color){ this.boardIconActive.borderColor = color; }
                };

                return TopPanel
            })();


            function Theme() {
                this.sidePanel = new sidePanel();
                this.topPanel = new topPanel();
            }
            return Theme
        })();
        Theme.prototype = {

        };
        return Theme;
    })

    .service('themeService', function(themeFactory){

        var themeServiceScope = this;

        themeServiceScope.theme = new themeFactory;
        themeServiceScope.theme.sidePanel.setMainBackgroundColor("#232323");
        themeServiceScope.theme.sidePanel.setMainColor("#FFFFFF");
        themeServiceScope.theme.sidePanel.setMainBorderColor("#999999");

        /*
        themeServiceScope.themes = [
            {name: "--Custom--",
                sidePanel:{
                    main: {
                        backgroundColor: "#76A8EE",
                        color: "#FF0000",
                        borderColor: "#FF0000"
                    },
                    menu: {
                        color: "#FF0000",
                        borderColor: "#FF0000"
                    },
                    menuActive: {
                        color: "#FF0000",
                        backgroundColor: "#FF0000"
                    }
                }
            },
            {name: "Basic Blue",
                sidePanel:{
                    main: {
                        backgroundColor: "#76A8EE",
                        color: "#000000",
                        borderColor: "#999999"
                    },
                    menu: {
                        color: "#EFEFEF",
                        borderColor: "#EFEFEF"
                    },
                    menuActive: {
                        color: "#FFFFFF",
                        backgroundColor: "rgba(100,100,100,0.4)"
                    }
                }
            }
        ];
        */
    });



