import Container from 'typedi';

import AuthController from '../controllers/AuthController';
import FilmeController from '../controllers/FilmeController';
import UserController from '../controllers/UserController';

import FilmeModel from '../models/FilmeModel';
import LocacaoModel from '../models/LocacaoModel';
import UserModel from '../models/UserModel';

import AuthService from '../services/AuthService';
import FilmeService from '../services/FilmeService';
import LocacaoService from '../services/LocacaoService';
import UserService from '../services/UserService';

Container.set('FilmeModel', new FilmeModel(Container));
Container.set('LocacaoModel', new LocacaoModel(Container));
Container.set('UserModel', new UserModel(Container));

Container.set('AuthService', new AuthService(Container));
Container.set('LocacaoService', new LocacaoService(Container));
Container.set('FilmeService', new FilmeService(Container));
Container.set('UserService', new UserService(Container));

Container.set('AuthController', new AuthController(Container));
Container.set('FilmeController', new FilmeController(Container));
Container.set('UserController', new UserController(Container));
