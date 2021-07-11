import {
  AuthenticationBindings,
  AuthenticationMetadata
} from '@loopback/authentication';
import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';




export class MyAuthStrategyProvider implements Provider<Strategy | undefined>{

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) { }

  value(): ValueOrPromise<Strategy | undefined> {
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify);
    } else {
      return Promise.reject(`The Strategy ${name} is not avaible.`);
    }
  }

  verify(
    userName: string,
    password: string,
    cb: (err: Error | null, user?: Object | false) => void
  ) {

  }


}
