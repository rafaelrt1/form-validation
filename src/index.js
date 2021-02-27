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
        pattern: {
            params: "^[0-9]{5}-[0-9]{3}$", 
            message: "O CEP deve estar no formato XXXXX-XXX, formado somente por números e hífen"
        },
        minLength: {
            params: 9,
            message: "O CEP deve ter 8 números e hífen"
        },
        maxLength: {
            params: 9,
            message: "O CEP deve ter 8 números e hífen"
        }
    });

    self.telefone = ko.observable().extend({
        required: {
            params: true,
            message: "O campo telefone é obrigatório"
        },
        minLength: {
            params: 8,
            message: "O telefone deve ter 8 ou 9 números"
        },
        maxLength: {
            params: 9,
            message: "O telefone deve ter 8 ou 9 números"
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

    self.bloqueiaUf = ko.observable(true);
    self.bloqueiaEndereco = ko.observable(true);
    self.bloqueiaComplemento = ko.observable(true);
    self.bloqueiaBairro = ko.observable(true);
    self.bloqueiaLocalidade = ko.observable(true);
    self.bloqueiaNumero = ko.observable(true);
    
    self.buttonCep = function () {
        $(".erroCep").addClass("invisivel")
        if(self.cep.isValid()) {
            var cepDigitado = appViewModel.cep();
                api.getCep(cepDigitado).then((result) => {
                    self.numero("");
                    if (result.erro) {
                        $(".erroCep").removeClass("invisivel")
                        self.endereco(result.logradouro);
                        self.localidade(result.localidade);
                        self.bairro(result.bairro);
                        self.uf(result.uf);
                        self.complemento(result.complemento);
                        
                        self.bloqueiaNumero(true);
                        self.bloqueiaUf(true);
                        self.bloqueiaLocalidade(true);
                        self.bloqueiaComplemento(true);
                        self.bloqueiaBairro(true);
                        self.bloqueiaEndereco(true);
                    }
                    else {
                        $(".erroCep").addClass("invisivel")
                        self.endereco(result.logradouro);
                        self.localidade(result.localidade);
                        self.bairro(result.bairro);
                        self.uf(result.uf);
                        self.complemento(result.complemento);
                        if(self.uf.isValid())
                            self.bloqueiaUf(true);
                        else 
                            self.bloqueiaUf(false);

                        if(self.numero.isValid())
                            self.bloqueiaNumero(true);
                        else 
                            self.bloqueiaNumero(false);
                        
                        if(self.localidade.isValid())
                            self.bloqueiaLocalidade(true);
                        else 
                            self.bloqueiaLocalidade(false);
                        
                        if(self.complemento.isValid() && self.complemento() !== "")
                            self.bloqueiaComplemento(true);
                        else 
                            self.bloqueiaComplemento(false);
                        
                        if(self.bairro.isValid())
                            self.bloqueiaBairro(true);
                        else 
                            self.bloqueiaBairro(false);
                        
                        if  (self.endereco.isValid())
                            self.bloqueiaEndereco(true);
                        else 
                            self.bloqueiaEndereco(false);
                    }                         
                })   
            }
    }
    self.enviar = function() {
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

const appViewModel = new AppViewModel();

window.appViewModel = appViewModel;

ko.validation.init();

appViewModel.isValid = ko.computed(function() {
    return ko.validatedObservable(appViewModel).isValid();
})

ko.applyBindings(appViewModel);