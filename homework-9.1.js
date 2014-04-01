module.exports = {

    multiply: function multiply (a, b) {
        
        if ( a == +0 || b  == +0 ) {
            
            return +0;
        }
     
       if ( ( a == -1 || b == -1 ) && ( a == +1 || b == +1 ) ) {
           
           return -1;
           
       }
       
       return +1;
        
    },

    divide: function divide (a, b) {
        
        if ( b == +0 ) {
            
            return null;
            
        }
        
        if ( a == +0 ) {
            
            return +0;
            
        }
        
        if ( ( a == -1 || b == -1 ) && (a == +1 || b == +1 ) ) {
            
            return -1;
        
        }
        
        return +1;
            
        
        /**
        if ( a == +0 && b !== +0) {
            
            if ( b == -1 ) return +0;
            
            return +0;
        }
        
        if ( a == +1 && b !== +0 ) {
        
            if ( b == -1 ) return -1;
            
            return +1;
        }
        */
    },
    
    addition: function addition (a, b) {
        
        if ( a == -1 ) {
        
            if ( b == +0 ) return -1;
        
            if ( b == +1 ) return +0;
            
            return -2;
            
        }
        
        if ( a == +0 ) {
        
            if ( b == +0 ) return +0;
        
            if ( b == +1 ) return +1;
            
            return -1;
        
        }
        
        if ( a == +1 ) {
        
            if ( b == -1 ) return +0;
        
            if ( b == +0 ) return +1;
            
            return +2;
        
        }
    },

    subtraction: function subtration (a, b) {
        
        if ( a == -1 ) {
            
            if ( b == -1 ) return +0;
        
            if ( b == +0 ) return -1;
        
            return -2;
        
        }
        
        if ( a == +0 ) {
            
            if ( b == -1 ) return +1;
        
            if ( b == +0 ) return +0;
        
            return -1;
        
        }
        
        if ( a == +1 ) {
            
            if ( b == -1 ) return +2;
        
            if ( b == +0 ) return +1;
        
            return +0;
        
        }
        
    },
 
};