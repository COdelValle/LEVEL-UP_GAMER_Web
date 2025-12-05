#!/usr/bin/env node

/**
 * 🧪 Script de Testing para Registro
 * 
 * Uso:
 * node testRegister.js
 * 
 * Verifica:
 * 1. Conectividad al backend
 * 2. Endpoint de registro funciona
 * 3. Payload correcto
 */

const BASE_URL = 'http://localhost:8080';

// Colores para console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n${colors.cyan}${msg}${colors.reset}\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`)
};

async function testBackendConnection() {
  log.header('Test 1: Conectividad al Backend');
  
  try {
    const res = await fetch(`${BASE_URL}/api/v1/health`, { method: 'GET' });
    if (res.ok) {
      log.success(`Backend está activo en ${BASE_URL}`);
      return true;
    } else {
      log.error(`Backend retornó status ${res.status}`);
      return false;
    }
  } catch (err) {
    log.error(`No se puede conectar a ${BASE_URL}`);
    log.info(`Asegúrate que el backend esté corriendo`);
    return false;
  }
}

async function testRegisterEndpoint() {
  log.header('Test 2: Endpoint de Registro');
  
  const testUser = {
    nombre: 'Test',
    apellido: 'User',
    email: `test${Date.now()}@example.com`,
    password: 'TestPassword123',
    rut: '11111111-1',
    telefono: '987654321',
    rol: 'user',
    activo: true
  };

  log.info(`Enviando payload test:`);
  console.log(JSON.stringify(testUser, null, 2));

  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });

    const data = await res.json();

    if (res.ok) {
      log.success(`Registro exitoso (Status ${res.status})`);
      log.info(`Response:`);
      console.log(JSON.stringify(data, null, 2));
      return true;
    } else {
      log.warn(`Registro falló (Status ${res.status})`);
      log.info(`Response:`);
      console.log(JSON.stringify(data, null, 2));
      return false;
    }
  } catch (err) {
    log.error(`Error en request: ${err.message}`);
    return false;
  }
}

async function testDuplicateEmail() {
  log.header('Test 3: Validación de Email Duplicado');
  
  const email = 'duplicate@example.com';
  
  const user1 = {
    nombre: 'User',
    apellido: 'One',
    email: email,
    password: 'Password123',
    rut: `${Math.floor(Math.random() * 90000000) + 10000000}-1`,
    telefono: '987654321',
    rol: 'user',
    activo: true
  };

  try {
    // Intenta registrar el primer usuario
    const res1 = await fetch(`${BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1)
    });

    const data1 = await res1.json();

    if (res1.ok) {
      log.success(`Primer registro exitoso`);
      
      // Intenta registrar con el mismo email
      const user2 = { ...user1, nombre: 'User', apellido: 'Two' };
      const res2 = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user2)
      });

      const data2 = await res2.json();

      if (!res2.ok && res2.status === 409) {
        log.success(`Validación de email duplicado funciona correctamente`);
        log.info(`Error esperado: ${data2.message}`);
        return true;
      } else {
        log.warn(`No rechazó el email duplicado como se esperaba`);
        return false;
      }
    } else {
      log.warn(`Primer registro falló: ${data1.message}`);
      return false;
    }
  } catch (err) {
    log.error(`Error en test: ${err.message}`);
    return false;
  }
}

async function runAllTests() {
  console.clear();
  log.header('🧪 SUITE DE TESTS - REGISTRO DE USUARIOS');
  
  const test1 = await testBackendConnection();
  if (!test1) {
    log.error('Backend no disponible. Detén aquí.');
    process.exit(1);
  }

  const test2 = await testRegisterEndpoint();
  const test3 = test2 ? await testDuplicateEmail() : null;

  log.header('📊 RESUMEN');
  log.info(`Backend conectado: ${test1 ? '✅' : '❌'}`);
  log.info(`Endpoint de registro: ${test2 ? '✅' : '❌'}`);
  log.info(`Validación duplicados: ${test3 ? '✅' : '❌'}`);

  if (test1 && test2 && test3) {
    log.success('Todos los tests pasaron! 🎉');
    process.exit(0);
  } else {
    log.error('Algunos tests fallaron. Revisa arriba.');
    process.exit(1);
  }
}

// Ejecuta
runAllTests().catch(err => {
  log.error(`Error fatal: ${err.message}`);
  process.exit(1);
});
