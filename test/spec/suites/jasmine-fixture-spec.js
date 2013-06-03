describe("jasmine.Fixtures", function() {
	var ajaxData = 'some ajax data'
	var fixtureUrl = 'some_url'
	var anotherFixtureUrl = 'another_url'
	jasmine.getFixtures().fixturesPath = '/test/spec/javascripts/fixtures';
	jasmine.getStyleFixtures().fixturesPath = '/test/spec/javascripts/fixtures';
	jasmine.getJSONFixtures().fixturesPath = '/test/spec/javascripts/fixtures';

  var fixturesContainer = function() {
    return $('#' + jasmine.getFixtures().containerId)
  }
  var appendFixturesContainerToDom = function() {
    $('body').append('<div id="' + jasmine.getFixtures().containerId + '">old content</div>')
  }

	beforeEach(function() {
		jasmine.getFixtures().clearCache()
		spyOn(jasmine.Fixtures.prototype, 'loadFixtureIntoCache_').andCallFake(function(relativeUrl){
			this.fixturesCache_[relativeUrl] = ajaxData
		})
	})

describe("jasmine.Fixtures using real AJAX call", function() {
  var defaultFixturesPath

  beforeEach(function() {
    defaultFixturesPath = jasmine.getFixtures().fixturesPath
    jasmine.getFixtures().fixturesPath = '/test/spec/fixtures'
  })

  afterEach(function() {
    jasmine.getFixtures().fixturesPath = defaultFixturesPath
  })

  describe("when fixture file exists", function() {
    var fixtureUrl = "real_non_mocked_fixture.html"

    it("should load content of fixture file", function() {
      var fixtureContent = jasmine.getFixtures().read(fixtureUrl)
      expect(fixtureContent).toEqual('<div id="real_non_mocked_fixture"></div>')
    })
  })

  /* TODO : start throwing again
  describe("when fixture file does not exist", function() {
    var fixtureUrl = "not_existing_fixture"

    it("should throw an exception", function() {
      expect(function() {
        jasmine.getFixtures().read(fixtureUrl)
      }).toThrow()
    })
  })
  */
})


})