```js
// 1. Zewnętrzne biblioteki
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import _ from 'lodash';

// 2. Moduły wewnętrzne
import UserList from './components/UserList';
import { fetchData } from './utils';
import { API_URL } from './config';

// 3. Pliki stylów
import './App.css';
```