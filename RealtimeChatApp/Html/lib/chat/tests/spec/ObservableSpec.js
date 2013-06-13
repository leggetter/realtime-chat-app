describe("The Observable class", function() {
  
  it("is defined", function() {
    expect( typeof chatjs.Observable !== 'undefined' ).toBe( true );
  });

  it("is a function", function() {
    expect( typeof chatjs.Observable === 'function' ).toBe( true );
  });

  it("has an addListener function", function() {
  	var observer = new chatjs.Observable();
    expect( typeof observer.addListener === 'function' ).toBe( true );
  });

});