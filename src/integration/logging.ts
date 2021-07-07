// export const logToConsoleEnabled = (): boolean => false;
export const logToConsoleEnabled = (): boolean => window.config.consoleLogDebug === true;

export const log = (message?: any, ...optionalParams: any[]) => {
    if (!logToConsoleEnabled()) return;
    console.log(message, optionalParams);
}

export const warn = (message?: any, ...optionalParams: any[]) => {
    if (!logToConsoleEnabled()) return;
    console.warn(message, optionalParams);
}

export const startupMessage = () => {
    /* eslint-disable */
    // const kurt = `
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNNWMMMMMMNX0Oxddolcccccccclld0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMWXOxoc:dNMWN0koc;,''............',lKWWNNNNNNWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMWKd:''..'cOOd:,''.................';ldlc:::::clodxOKXWMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMWO:'.....',;,'....................''''...........''',:ldOKNMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMM0:'......''............................................'';cdOXWMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMNd'.......................................................'';oKWMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMXl'.....................................................',lkKWMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMNOkXXl'...........'''......................''''''...........'lXMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMWk;':o:'......',;coddddoc:,'''........'',:coxkkkxdl:,'........;OWMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMXl'..'''....',lk0XNNNNNXXK0OxdolllllooxkOKXNNNNNNNXKkl,'......'oXMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMM0:'....'...':kXNNNNNXNNNNNNNNNNXXXXXXNNNNNNNNNNNNNXNNKx:'.....':0MMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMO;'.......':OXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXk:'....';OMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMO;'.......,dXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXd,....';OMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMKc'.......,xXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXNNNNNNXd,....':0MMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMWx,.......,xXNNNNNXXXKKKKXNNNXNNNNNNNNNNNNXXKKKXXXNNNNNXd,....'lXMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMKc'......,xXNNKkdooooood0NNNNNNNNNNNNNNNNKxoooooodkKXNXd,....,xWMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMWO:'.....,xXNNKxxkO0O0KKXNNNNNNNNNNNNNNNNXKK0O00Oxx0XNXd,...':0MMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMWk;'....,xXNNNNNNOoclxKNNNNNNNNNNNNNNNNNNXxlcoONNNNNNXd,...,xNMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMWk;'..',xXNNNNNXOc::dKNXNNNNNNNNNNNNNNNNKd::ckXNNNNNXx,'''cKMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMWx,;c:;xXNNNNNNXKO0XNNNNNNNNNNNNNNNNNNNXX0OKXNNNNNNXd;lxocxXMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMKllOXx:xXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXx:xXXkcoXMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMWxckXXx:xXNNXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXx:xXNXx:kWMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMWxckXNk:xXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXx:xXNXdcOMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMXdcxKx:xXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXx:xXKdcxNMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMNOolc;xXNNNNNNNNNNNNNNNNXXNNNNNNXXNNNNNNNNNNNNNNNNXx:lold0WMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMWKo:xXNNNNNNNNNNNNNNNXkoddxxddoxKNNNNNNNNNNNNNNNXx;lOXWMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMOcxXNNNNNNNNNNNNXNNXKOkxxxxkO0XNNNNNNNNNNNNNNNXxckWMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMOcxXNNNNNNNNNNNNXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXx:kMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMOcxXNNNNNNNNNNNX0OOOOOOOOOOOOOOOOOKXNNNNNNNNNNXx:kMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMOcdXNNNNNNNNNNNkccooooooooooooool:dXNNNNNNNNNNXdcOMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMXdckXNNNNNNNNNN0cl0XXXXXXXXXXXXKd:kXNNNNNNNNNXxcxNMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMMNxcdKNNNNNNNNNXkllx0KXXXXXXK0kocxKNNNNNNNNNKdckNMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMWOllOXNNNXNNXNXKkoooooooooooox0XNNNNNNNNX0olOWMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMWXdcdKXNXXNNNNNNXXK000O00KXXNNNNNNNNNNKxcdKWMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0olxKXNNNNNNNNNNNNNNNNNNNNNNNNNNNKkllONMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNOolx0XNNNNNNNNNNNNNNNNNXNNNNXKkllkXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMN0dlok0XNNNNNNNXNNNNNNNNXKkdloONMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXOdoodkO0KXXXXXXKK0kdoodkKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNXXKKKKKOxl;;loooooooool:;ok000KKKKXNWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMMMMNKkdoc::;:c::llll::kK000000KX0l;lol:;c:;;;:codOKWMMMMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMMMWKxc;''''''':xo:x0K0d:xXNNNNNNNXOcl0KOccko,''''''';lkXWMMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMMWXd;'''''''''':kk:l0KKOlcxKXNNNXKkclkKKd:d0d,''''''''',:kNMMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMW0c'''''''''''':k0o:xK0kl,,coodol:,,lk0OccOKd,''''''''''',dXMMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMMKc''''''''''''':kKk::llc:,''''''''';cll::xKKd,'''''''''''',xNMMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMNo,''''''''''''':kK0xoxOOl,''''''''',dOkod0KKd,''''''''''''':0MMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMM0:'''''''''''''':kKKKKKKKOd;''''''',oOKKKKKKKd,''''''''''''';kWMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMk;'''''''''''''':kKKKKKKKKKd;''''''lOKKKKKKKKd,''''''''''''',xWMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMWk;'''''''''''''':kKKKKKKKKOc''''''';xKKKKKKKKd,''''''''''''',dWMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMO;'''''''''''''';dkkkkkOkkc''''''''':xOOOOOOko,''''''''''''',dWMMMMMMMMMMMMMMMMMM
    // MMMMMMMMMMMMMMMMMMMO:'''''''''''''',;;;;;;;;;,'''''''''',;;;;;;;,'''''''''''''',dWMMMMMMMMMMMMMMMMMM`;
    // console.log(kurt);

    const msg = `
   ____    ___   ______  __ __  ____  ____    ____    
  |    \\  /   \\ |      ||  |  ||    ||    \\  /    |   
  |  _  ||     ||      ||  |  | |  | |  _  ||   __|   
  |  |  ||  O  ||_|  |_||  _  | |  | |  |  ||  |  |   
  |  |  ||     |  |  |  |  |  | |  | |  |  ||  |_ |   
  |  |  ||     |  |  |  |  |  | |  | |  |  ||     |   
  |__|__| \\___/   |__|  |__|__||____||__|__||___,_|   
                                                      
   ______   ___        _____   ___    ___             
  |      | /   \\      / ___/  /  _]  /  _]            
  |      ||     |    (   \\_  /  [_  /  [_             
  |_|  |_||  O  |     \\__  ||    _]|    _]            
    |  |  |     |     /  \\ ||   [_ |   [_             
    |  |  |     |     \\    ||     ||     |            
    |__|   \\___/       \\___||_____||_____|            
                                                      
   __ __    ___  ____     ___   __  __                
  |  |  |  /  _]|    \\   /  _] |  ||  |               
  |  |  | /  [_ |  D  ) /  [_  |  ||  |               
  |  _  ||    _]|    / |    _] |  ||  |               
  |  |  ||   [_ |    \\ |   [_  |__||__|               
  |  |  ||     ||  .  \\|     |  __  __                
  |__|__||_____||__|\\_||_____| |__||__|               
                                                      
`;
    /* eslint-enable */
    console.log(`%c${msg}`, 'color: pink; background:black; font-size: 15px');
}