//Variáveis relacionadas ao canvas
    var canvas = document.getElementById("Game");
    var contexto = canvas.getContext("2d");

//Imagens
    //Personagem
        var img_Personagem = new Image();
        img_Personagem.src = "Assets/FlappyBird_Character.png";

    //Obstáculos
        var img_Obstaculos = new Image();
        img_Obstaculos.src = "Assets/FlappyBird_Pipe.png";

    //Fundo
        var img_Fundo = new Image();
        img_Fundo.src = "Assets/FlappyBird_Background.png";

//Variaveis relacionadas aos dois jogadores
	var largura = 20;
	var altura = 70;
	var velocidadeMov = 30;

//Variáveis de Placar
	var placarEsquerda = 0;
	var placarDireita = 0;

//Variáveis de posição do Jogador da esquerda
	var x1 = 10;
	var y1 = 10;

//Variáveis de posição do Jogador da direita
	var x2 = canvas.width - largura - 10;
	var y2 = canvas.height - altura - 10;

//Controles Jogador Direita
	var setaCim, setaBai;

//Controles Jogador Esquerda
	var btnW, btnS;

//Variáveis da Bola
	var Bx = canvas.width / 2;
	var By = canvas.height / 2;
	var BTamanho = 30;
    var B_VelBasica = 10;
	var B_x = B_VelBasica;
	var B_y = B_VelBasica;

//Declaração da formatação do texto do placar
    contexto.font='35px Arial';

//Loop principal
    setInterval(update, 1000/30);

//Método executado no loop principal
    function update()
    {
        
        //Limpa a tela
            contexto.clearRect(0,0,canvas.width,canvas.height);
        
        //Desenha a imagem de fundo
            contexto.drawImage(img_Fundo,0,350,800,600,0,0,canvas.width, canvas.height);

        //Desenha o placar do jogador da esquerda
            contexto.fillText(placarEsquerda, canvas.width * 0.20, canvas.height * 0.10);

        //Desenha o placar do jogador da direita
            contexto.fillText(placarDireita, canvas.width * 0.80, canvas.height * 0.10);

        //Event listener de quando algum botão é pressionado
            document.addEventListener('keydown', btnApertado);

        //Event Listener de quando algum botão é solto
            document.addEventListener('keyup', btnSolto)

        //Método que verifica quais botões estão pressionados
            verBtns();

        //Método que verifica se a bola colidiu com algo
            verColisaoB();

        //Desenha a bola
            contexto.drawImage(img_Personagem, Bx, By, BTamanho, BTamanho);

        //Desenha o jogador da esquerda
            contexto.drawImage(img_Obstaculos,115, 17, 30, 112, x1,y1,largura,altura);
        
        //Desenha o jogador da direita
            contexto.drawImage(img_Obstaculos,115, 17, 30, 112, x2,y2,largura,altura);
        
    }//Fim do método update

//Método que verifica se a bola colidiu com algo
    function verColisaoB()
    {

        //Se tocar na parede esquerda
            if(Bx + BTamanho == 0){ ponto(1);} 

        //Se tocar na parede direita
            else if(Bx == canvas.width){ ponto(2);} 

        //Se tocar nas paredes verticais
            else if(By < 0 || By + BTamanho > canvas.height){ B_y *= -1;}

        //Se tocar na parte de cima do jogador da esquerda
            else if(Bx < x1 + largura && Bx + BTamanho > x1 && 
               By < y1 + altura / 2 && By + BTamanho > y1) { B_x *= -1; B_y = - B_VelBasica;}

        //Se tocar na parte de cima do jogador da esquerda
            else if(Bx < x1 + largura && Bx + BTamanho > x1 && 
                By < y1 + altura && By + BTamanho > y1 + altura / 2) { B_x *= -1; B_y = B_VelBasica;}

        //Se tocar na parte de cima do jogador da direita
            else if(Bx < x2 + largura && Bx + BTamanho > x2 && 
               By < y2 + altura / 2 && By + BTamanho > y2) { B_x *= -1; B_y = - B_VelBasica;}

        //Se tocar na parte de cima do jogador da direita
            else if(Bx < x2 + largura && Bx + BTamanho > x2 && 
               By < y2 + altura && By + BTamanho > y2 + altura / 2) { B_x *= -1; B_y = B_VelBasica;}

        //Tendo colisão ou não a bola se move
            Bx += B_x;
            By += B_y;
        
    }//Fim do método verColisao

//Método que veridica em qual parede a bola bateu
    function ponto(paredeTocada)
    {

        //Se a bola bateu na parede da esquerda, adiciona um ponto ao placar do jogador da direita
           if(paredeTocada == 1){ placarDireita += 1; }

        //Se a bola bateu na parede da direita, adiciona um ponto ao placar do jogador da esquerda
           if(paredeTocada == 2){ placarEsquerda += 1; }

        //Execura o método reiniciar após um segundo
           setTimeout(reiniciar, 1000);

    }//Fim do método ponto

//Método que reinicia a posição da bola no centro da tela e a faz ir na direção do jogador que pontuou
    function reiniciar()
    {

        Bx = canvas.width / 2;
        By = canvas.height / 2;

        B_x *= -1;

    }//Fim do método reiniciar

//Callback de quando um botão é apertado
    function btnApertado(e)
    {

        //Seta para cima
            if(e.keyCode == 38){ setaCim = true; }

        //Seta para baixo
            if(e.keyCode == 40){ setaBai = true; }

        //Botão W
            if(e.keyCode == 87){ btnW = true; }

        //Botão S
            if(e.keyCode == 83){ btnS = true; }

    }//Fim do Callback btnPressionado

//Callback de quando um botão é solto
    function btnSolto(e)
    { 

        //Seta para cima
            if(e.keyCode == 38){ setaCim = false; }

        //Seta para baixo
            if(e.keyCode == 40){ setaBai = false; }

        //Botão W
            if(e.keyCode == 87){ btnW = false; }

        //Botão S
            if(e.keyCode == 83){ btnS = false; }

    }//Fim do Callback btnSolto

//Método que verifica quais botões estão sendo pressionados
    function verBtns()
    {

        //Se a seta para cima está sendo pressionada e se o jogador 2 não está tocando a parede de cima
            if(setaCim == true && y2 > 0){ y2 -= velocidadeMov; }

        //Se a seta para baixo está sendo pressionada e se o jogador 2 não está tocando a parede de baixo
            if(setaBai == true && y2 + altura < canvas.height){ y2 += velocidadeMov; }

        //Se o botão W está sendo pressionado e se o jogador 1 não está tocando a parede de cima
            if(btnW == true && y1 > 0){ y1 -= velocidadeMov; }

        //Se o botão S está sendo pressinado e se o jogador 1 não está tocando a parede de baixo
            if(btnS == true && y1 + altura < canvas.height){ y1 += velocidadeMov; }

    }//Fim do Método verBtns