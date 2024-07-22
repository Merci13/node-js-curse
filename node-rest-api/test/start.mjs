

import { expect } from 'chai';

describe('Addition', function() {
    it('should add numbers correctly', function(done) {
        const num1 = 2;
        const num2 = 3;
        
        // Realiza la operación de suma y usa expect de Chai para la aserción
        expect(num1 + num2).to.equal(5);
        
        // Llama a done() para indicar que la prueba ha terminado correctamente
        done();
    });

    it('should not add numbers correctly', function(done) {
        const num1 = 2;
        const num2 = 3;
        
        // Realiza la operación de suma y usa expect de Chai para la aserción
        expect(num1 + num2).not.to.equal(6);
        
        // Llama a done() para indicar que la prueba ha terminado correctamente
        done();
    });
});

