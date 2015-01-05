QUnit.test( "Unit tests color", function( assert ) {
    assert.ok( getColor(0) == "0x000000", "Passed!" );
    assert.ok( getColor(10) == "0xb28700", "Passed!" );
    assert.ok( getColor(20) == "0xcc9a00", "Passed!" );
});
QUnit.test( "Unit tests isHerePlaces", function( assert ) {
    var arryRouts = [];
    arryRouts.push({lon: 0, alt: 0, lat:0});
    arryRouts.push({lon: 0, alt: 0, lat:10});
    arryRouts.push({lon: 10, alt: 0, lat:0});
    arryRouts.push({lon: 10, alt: 0, lat:10});
    placesCoor.push(arryRouts);
    assert.ok( isHerePlaces(0,0) === true , "Passed!" );
    assert.ok( isHerePlaces(1,0) === true , "Passed!" );
    assert.ok( isHerePlaces(10,10) === false , "Passed!" );
    assert.ok( isHerePlaces(1,1) === true , "Passed!" );
});
QUnit.test( "Unit tests isHereRoute", function( assert ) {
    var arryRouts = [];
    arryRouts.push({lon: 0, alt: 0, lat: 0});
    arryRouts.push({lon: 10, alt: 0, lat: 10});
    routeCoor.push(arryRouts);
    assert.ok( isHereRoute(0,0) === true , "Passed!" );
    assert.ok( isHereRoute(1,0) === true , "Passed!" );
    assert.ok( isHereRoute(10,10) === false , "Passed!" );
    assert.ok( isHereRoute(1,1) === true , "Passed!" );
});