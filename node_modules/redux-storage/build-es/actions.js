'use strict';

import { createAction } from 'redux-actions';

import * as constants from './constants';

export var load = createAction(constants.LOAD);
export var save = createAction(constants.SAVE);