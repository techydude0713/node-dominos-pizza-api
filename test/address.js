import IsDominos from '../utils/DominosTypes.js';
import {Address} from '../index.js';

const isDominos=new IsDominos;

const testAddress=function(test,addressInfo){
    try{
        isDominos.test(test);
        test.expects(`Address class to Populate address.dominos from addressInfo: ${JSON.stringify(addressInfo)}`);    
        
        const address=new Address(addressInfo);
        isDominos.address(address);

        validateAddress(test,address);
    }catch(err){
        console.trace(err);
        test.fail();
    }
    test.pass();
    test.done();
}

const validateAddress=function(test,address){
    isDominos.test(test);
    isDominos.address(address);

    for(const [key,value] of Object.entries(address.dominos)){
        const camelKey=key[0].toLowerCase()+key.slice(1);
        
        //ensure that qall values match up despite casing
        test.compare(
            value,
            address[camelKey],
            `expected address.dominos.${key} ${JSON.stringify(value)} to equal address.${camelKey} "${JSON.stringify(address[camelKey])}"`    
        );
    }

    //ensure the default of House is set for the unit type
    test.compare(
        'House',
        address.dominos.UnitType,
        `expected address.dominos.UnitType ${address.dominos.UnitType} to equal House`    
    );
}

const runTest=function(test){
    let addressObject={
        street:'900 Clark Ave',
        city:'St. Louis',
        region:'MO',
        postalCode:'63102'
    }

    // Address class to Populate address.dominos from full AddressObject
    testAddress(test,addressObject);

    let addressString=`${addressObject.street}, ${addressObject.city}, ${addressObject.region}, ${addressObject.postalCode}`;
    
    // Address class to Populate address.dominos from full AddressString
    testAddress(test,addressString);

    addressObject={
        city:'St. Louis',
        region:'MO',
        postalCode:'63102'
    }

    // Address class to Populate address.dominos from partial AddressObject
    testAddress(test,addressObject);

    addressString=`${addressObject.city}, ${addressObject.region}, ${addressObject.postalCode}`;
    
    // Address class to Populate address.dominos from partial AddressString
    testAddress(test,addressString);
    
    addressObject={
        city:'St. Louis',
        postalCode:'63102'
    }

    // Address class to Populate address.dominos from city and zip AddressObject
    testAddress(test,addressObject);

    addressString=`${addressObject.city}, ${addressObject.postalCode}`
    
    // Address class to Populate address.dominos from city and zip AddressString
    testAddress(test,addressString);

    addressObject={
        postalCode:'63102'
    }
    
    // Address class to Populate address.dominos from zip AddressObject
    testAddress(test,addressObject);

    addressString=`${addressObject.postalCode}`;
    
    // Address class to Populate address.dominos from zip AddressString
    testAddress(test,addressString);

    addressString=Number(addressString);
    
    // Address class to Populate address.dominos from zip AddressNumber
    testAddress(test,addressObject,addressString);

}

export {
    runTest as default,
    runTest
}