sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {
                /*//Variáveis
                //Variável de Texto
                var time = "Cruzeiro";
                //Variável Numérica
                var pontos = 13;
                //Lista ou Array
                var top4 = ["Botafogo", "Palmeiras", "São Paulo", "Atlético-MG"];

                //Escrever dados na aba Console
                console.log(time);
                console.log(pontos);
                console.log(top4);

                //Objetos
                var meuTime = {
                    nome : "São Paulo",
                    pontos : 15,
                    artilheiros : ["Calleri","Pablo","Luciano","Marcos Paulo"],
                    adicionarPontos : function(pontosNovos){
                        this.pontos = this.pontos + pontosNovos;
                    }
                };

                console.log(meuTime);
                console.log("São Paulo ganhou!");
                meuTime.adicionarPontos(3);
                console.log(meuTime.pontos);

                Vamos criar um Modelo
                antes, as variáveis que vão no modelo
                var dadosGerais = {
                    rodada : '10ª',
                    campeonato : "Brasileirão 2023 do Canal FIORINET"
                };

                //agora sim, vamos criar o modelo
                var dadosModel = new JSONModel();
                //preenchendo dataModel com o valor dos dadosGerais
                dadosModel.setData(dadosGerais);
                //obtendo a view associada a esse controller
                var view = this.getView();
                //atribuindo o modelo à tela
                view.setModel(dadosModel, "ModeloDadosGerais");*/

                //3 Objetos
                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};

                //3 Modelos - 1 para cada Objeto
                //Variável dentro do parenteses substitui o comando setData
                var dadosModel = new JSONModel(dadosGerais);
                var classificacaoModel = new JSONModel(classificacao);
                var partidasModel = new JSONModel(partidas);

                //Atribuindo os 3 Modelos à tela (View)
                this.getView().setModel(dadosModel, "ModeloDadosGerais");
                this.getView().setModel(classificacaoModel, "ModeloClassificacao");
                this.getView().setModel(partidasModel, "ModeloPartidas");

                //Chamando a função de busca dos dados na API
                this.buscarDadosGerais();
                this.buscarClassificacao();
            },
            buscarDadosGerais : function(){
                //Obter o Model a ser atualizado
                var dadosModel2 = this.getView().getModel("ModeloDadosGerais");

                //Configurações para acessar a API
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_a19b079d0d4f1a51187b1ee1028f30"
                    }
                };

                //Chamando a API
                $.ajax(configuracoes)
                //Sucesso
                .done(function(resposta){
                    dadosModel2.setData(resposta);
                    //Buscando as partidas filtrando pela rodada atual
                    this.buscarPartidas(resposta.rodada_atual.rodada);
                //Quando chama uma função dentro da outra tem colocar esse bind
                }.bind(this))
                //Erro
                .fail(function(erro){

                });
            },
            buscarClassificacao : function(){
                //Obter o Model a ser atualizado
                var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");

                //Configurações para acessar a API
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_a19b079d0d4f1a51187b1ee1028f30"
                    }
                };

                //Chamando a API
                $.ajax(configuracoes)
                //Sucesso
                .done(function(resposta){
                    classificacaoModel2.setData({"Classificacao" : resposta});
                })
                //Erro
                .fail(function(erro){

                });
            },
            buscarPartidas : function(rodada){
                //Obter o Model a ser atualizado
                var partidasModel2 = this.getView().getModel("ModeloPartidas");

                //Configurações para acessar a API
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_a19b079d0d4f1a51187b1ee1028f30"
                    }
                };

                //Chamando a API
                $.ajax(configuracoes)
                //Sucesso
                .done(function(resposta){
                    debugger;
                    partidasModel2.setData(resposta);
                    
                })
                //Erro
                .fail(function(erro){
                    debugger;
                });
            }
        });
    });
