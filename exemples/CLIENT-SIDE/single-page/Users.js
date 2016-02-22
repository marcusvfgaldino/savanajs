$savana(document).done(function(e) {

    var modelUsers = savana.Model({

        configs: {
           getUsers: {
                'url': '/exemples/data/test.json',
                'method':'GET',
                'type': 'json'
            },
            setUser: {
                'url': '/exemples/data/setUser.php',
                'method':'POST',
                'type': 'json',
                'data':'',
            },
            uptUser: {
                'url': '/exemples/data/uptUser.php',
                'method':'POST',
                'type': 'json',
                'data':'',
            },
            delUser: {
                'url': '/exemples/data/delUser.php',
                'method':'POST',
                'type': 'json',
                'data':'',
            },
        },

        getUsers: function(scope, fn) {
            var promise = savana.async(scope.configs.getUsers);
            promise.then(function(response) {
                var json = savana.modelOrderBy(response.users, "name", "asc");  // Order by
                fn(json);
            }).catch(function(err) {
                savana.debug(err, "error");
            });
            return scope;
        },

        setUsers: function(scope, data, fn) {
            scope.configs.setUsers.data = data;
            var promise = savana.async(scope.configs.setUsers);
            promise.then(function(response) {
                fn(response);
            }).catch(function(err) {
                savana.debug(err, "error");
            });
            return scope;
        }

    });

    var userView = savana.View({

        parent: "div#listUsers",
        child: "#list-users-tpl",

        init: function(scope, json) {    

            scope.search(scope, json);
            scope.insert(scope, json);
            scope.update(scope, json);
            scope.build(scope, json);
            savana.output();                     

        },

        build: function(scope, model) {

            var user, content = "";

            for (key in model) {
                user = model[key];
                user.active = (user.active) ? true : false;
                content += "<tr><td>"+user.active+"</td><td>"+user.name+"</td><td><a href='#' rel='" + user.id + "' class='edit'>Editar</a> - <a href='#' rel='" + user.id + "' class='del'>Excluir</a></td></tr>";
            }

            savana.render(scope, content, model);
            scope.always(scope, model);
            scope.delete(scope, model);

        },

        insert: function(scope, json) {

            $savana("form#saveUser").on("submit", function(e) {

                var foms_input = $savana(this).serialize(true);
                $savana(this).clearForm();
                savana.modelInsert(scope, json, foms_input, function(model) {
                    json = savana.modelOrderBy(model, "name", "asc");
                    scope.build(scope, json);
                });   
                e.preventDefault();

            })

        },

        delete: function(scope, json) {

            $savana(scope.parent + " a.del").on("click", function(e) {
                var model_upt = savana.modelDelete(json, "id", $savana(this).attr("rel"));
                json = savana.modelOrderBy(model_upt, "name", "asc");
                scope.build(scope, json);
                e.preventDefault();
            });

        },

        always: function(scope, json) {

            $savana(scope.parent + " a.edit").on("click", function(e) {
                savana.setValuesInForm("form#editUser", json, "id", $savana(this).attr("rel"));
                e.preventDefault();
            });

        },

        update: function(scope, json) {

            $savana("form#editUser").on("submit", function(e) {

                var foms_input = $savana(this).serialize(true);
                $savana(this).clearForm();
                savana.modelUpdate(scope, json, foms_input, "id", function(model) {
                    json = savana.modelOrderBy(model, "name", "asc");
                    scope.build(scope, json);
                });
                e.preventDefault();

            })

        },

        search: function(scope, json) {

            $savana("input.search-users").on("keyup", function(e) {
                var newModel = savana.modelSearch($savana(this), json, "name");
                scope.build(scope, newModel);
            });

        }

    });

    var routerUser = savana.Router({

        router: {
                  listUser:{
                    name:"list-users", 
                    linkid:"#linkuser",
                    async: "list-user.html"
                  },
                  listUser2:{
                    name:"list-users2", 
                    linkid:"#linkuser2",
                    async: "list-user2.html"
                  },
        },

        init: function(scope) {
            savana.loadRouter(scope, scope.router.listUser, function(params) {
                modelUsers.getUsers(modelUsers, function(resp){
                    userView.init(userView, resp);
                });
            });

            savana.loadRouter(scope, scope.router.listUser2, function(params) {
                modelUsers.getUsers(modelUsers, function(resp){
                    userView.init(userView, resp);
                });
            });
        }

    });
 
    routerUser.init(routerUser);

});