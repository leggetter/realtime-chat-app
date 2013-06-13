describe("The ChatModel class", function() {
  
  it("is defined", function() {
    expect( typeof chatjs.ChatModel !== 'undefined' ).toBe( true );
  });

  it("is a function", function() {
    expect( typeof chatjs.ChatViewModel === 'function' ).toBe( true );
  });

  it("is an Observable", function() {
  	var model = new chatjs.ChatModel();
    expect( model instanceof chatjs.Observable ).toBe( true );
  });

});