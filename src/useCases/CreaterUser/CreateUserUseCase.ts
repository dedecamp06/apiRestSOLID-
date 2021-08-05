import { IMailProvider } from './../../providers/IMailProvider';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';

export class CreateUserUseCase {
    constructor(
       private userRepository: IUsersRepository,
       private mailProvider: IMailProvider,
    ){}

    async execute(data: ICreateUserRequestDTO){
       const userAlreadyExists = await this.userRepository.findByEmail(data.email);

       if(userAlreadyExists){
           throw new Error('User alreadry exits.')
       }

       const user = new User(data);

       await this.userRepository.save(user)

       await this.mailProvider.sendMail({
        to: {
          name: data.name,
          email: data.email,
        },
        from: {
          name: 'teste',
          email: 'teste@teste.com',
        },
        subject: 'Teste API with solid',
        body: '<h1>Bem Vindo a minha API!</h1>'
      })
    }
}