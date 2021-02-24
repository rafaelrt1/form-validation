import api from "./../api/api.js"
import css from "./style.css"

function AppViewModel() {
    var self = this;
    self.firstName = ko.observable().extend({ 
        required: {
            params: true,
            message: "O campo Nome é obrigatório!"
        },
        minLength: {
            params: 2,
            message: "O nome deve ter pelo menos 2 letras"
        },
        pattern: {
            params: "^[A-Za-zÀ-ú ']+$",
            message: "O nome deve ser composto somente de letras"
        }
    });
        
    self.lastName = ko.observable().extend({
        required: {
            params: true,
            message: "O campo Sobrenome é obrigatório!"
        },
        minLength: {
            params: 2,
            message: "O sobrenome deve ter pelo menos 2 letras"
        },
        pattern: {
            params: "^[A-Za-zÀ-ú ']+$",
            message: "O sobrenome deve ser composto somente de letras"
        }
    });

    self.ddd = ko.observable().extend({
        required: {
            params: true,
            message: "O campo DDD é obrigatório!"
        },
        number: {
            params: true,
            message: "O DDD deve ser composto somente por números"
        },
        minLength: {
            params: 2,
            message: "O DDD deve ter 2 números"
        },
        maxLength: {
            params: 2,
            message: "O DDD deve ter 2 números"
        }
    });

    self.cep = ko.observable().extend({
        required: {
            params: true,
            message: "O campo CEP é obrigatório!"
        },
        minLength: {
            params: 9,
            message: "O CEP deve ter 8 números e hífen"
        },
        maxLength: {
            params: 9,
            message: "O CEP deve ter 8 números e hífen"
        },
        pattern: {
            params: "^[0-9]{5}-[0-9]{3}$", 
            message: "O CEP deve estar no formato XXXXX-XXX, formado somente por números e hífen"
        }
    });

    self.telefone = ko.observable().extend({
        required: {
            params: true,
            message: "O campo telefone é obrigatório"
        },
        minLength: {
            params: 9,
            message: "O telefone deve ter 9 números"
        },
        maxLength: {
            params: 9,
            message: "O telefone deve ter somente 9 números"
        },
        number: {
            params: true,
            message: "O telefone deve ser composto somente de números"
        }
    });

    self.endereco = ko.observable().extend({
        required: {
            params: true,
            message: "O campo endereço é obrigatório!"
        },
        minLength: {
            params: 5,
            message: "O endereço é muito curto"
        },
        pattern: {
            params: "^[A-Za-zÀ-ú0-9 ']+$",
            message: "O endereço deve ser composto somente de letras e números"
        }
    });

    self.numero = ko.observable().extend({
        required: {
            params: true,
            message: "O campo número é obrigatório!"
        },
        pattern: {
            params: "^[A-Za-zÀ-ú0-9 ']+$", 
            message: "O campo número pode ser preenchido com letras e números"
        },
        minLength: {
            params: 1,
            message: "O número é muito curto"
        },
        maxLength: {
            params: 12,
            message: "O número é muito grande"
        }
    });

    self.complemento = ko.observable().extend({
        pattern: {
            params: "^[A-Za-zÀ-ú0-9- ']+$",
            message: "O complemento deve ser composto somente de letras, números e hífens"
        },
        minLength: {
            params: 2,
            message: "O complemento é muito curto"
        }
    });

    self.bairro = ko.observable().extend({
        required: {
            params: true,
            message: "O campo bairro é obrigatório!"
        },
        pattern: {
            params: "^[A-Za-zÀ-ú ']+$",
            message: "O bairro deve ser composto somente de letras"
        },
        minLength: {
            params: 5,
            message: "O bairro é muito curto"
        }
    });

    self.localidade = ko.observable().extend({
        required: {
            params: true,
            message: "O campo cidade é obrigatório!"
        },
        pattern: {
            params: "^[A-Za-zÀ-ú ']+$",
            message: "A cidade deve ser composto somente de letras"
        },
        minLength: {
            params: 5,
            message: "A cidade é muito curto"
        }
    });

    self.uf = ko.observable().extend({
        required: {
            params: true,
            message: "O campo estado é obrigatório!"
        },
        pattern: {
            params: "^[A-Z a-z]+$",
            message: "O estado deve ser composto somente de letras"
        },
        minLength: {
            params: 2,
            message: "O estado deve estar no formato de UF (XX)"
        },
        maxLength: {
            params: 2,
            message: "O estado deve estar no formato de UF (XX)"
        }
    });
    
    self.buttonCep = function () {
        self.Erros = ko.validation.group([self.firstName, self.lastName, self.telefone, self.ddd, self.cep]);    
        if (self.Erros().length === 0) {
            var cepDigitado = appViewModel.cep();
            api.getCep(cepDigitado).then((result) => {
                self.endereco(result.logradouro);
                self.localidade(result.localidade);
                self.bairro(result.bairro);
                self.uf(result.uf);
                self.cep(result.cep);
                self.complemento(result.complemento);
                $("#enviar").removeAttr("disabled");
                if(self.localidade().length !== 0) 
                    $("#validationCustom04").attr("disabled", "disabled");

                if(self.uf().length !== 0) 
                    $("#validationCustom05").attr("disabled", "disabled");
                
                if(self.bairro().length !== 0)  
                    $("#validationCustom07").attr("disabled", "disabled");
                else 
                    $("#validationCustom07").removeAttr("disabled");
                
                if(self.endereco().length !== 0)  
                    $("#validationCustom09").attr("disabled", "disabled");
                else 
                    $("#validationCustom09").removeAttr("disabled");
                
                if(self.complemento().length !== 0)  
                    $("#validationCustom011").attr("disabled", "disabled");
                else 
                    $("#validationCustom011").removeAttr("disabled");                          
            })
        }
        else
            self.Erros.showAllMessages();   
    }
    self.enviar = function() {
        self.Erros = ko.validation.group([self.firstName, self.lastName, self.telefone, self.ddd, self.cep, self.endereco, self.numero, self.complemento, self.bairro, self.localidade, self.uf]);
            if (self.Erros().length === 0) {
                var dados = {
                    "Nome": self.firstName(),
                    "Sobrenome": self.lastName(),
                    "DDD": self.ddd(),
                    "Telefone": self.telefone(),
                    "CEP": self.cep(),
                    "Endereço": self.endereco(),
                    "Número": self.numero(),
                    "Complemento": self.complemento(),
                    "Bairro": self.bairro(),
                    "Cidade": self.localidade(),
                    "Estado": self.uf()
                }
                console.log(dados);
            }
    }
}

const appViewModel = new AppViewModel();

window.appViewModel = appViewModel;
ko.validation.init();

ko.applyBindings(appViewModel);