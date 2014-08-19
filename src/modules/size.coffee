HEADER_HEIGHT = 50
NAV_HEIGHT    = 50
FOOTER_HEIGHT = 65
_style = document.createElement "style"
document.body.appendChild _style

generateStyle = (heights) ->
  _code = ""
  for orientation in ["portrait", "landscape"]
    _code += """
      @media screen and (orientation: #{orientation}) {
        article[data-header] > section > div:not(.pulltorefresh){
          min-height: #{heights[orientation]-HEADER_HEIGHT}px;
        }
        article[data-nav] > section > div:not(.pulltorefresh){
          min-height: #{heights[orientation]-NAV_HEIGHT}px;
        }
        article[data-footer] > section > div:not(.pulltorefresh){
          min-height: #{heights[orientation]-FOOTER_HEIGHT}px;
        }
        article[data-header][data-nav] > section > div:not(.pulltorefresh){
          min-height: #{heights[orientation] - HEADER_HEIGHT - NAV_HEIGHT}px;
        }
        article[data-header][data-footer] > section > div:not(.pulltorefresh){
          min-height: #{heights[orientation] - HEADER_HEIGHT - FOOTER_HEIGHT}px;
        }
        article[data-nav][data-footer] > section > div:not(.pulltorefresh){
          min-height: #{heights[orientation] - NAV_HEIGHT - FOOTER_HEIGHT}px;
        }
        article[data-header][data-nav][data-footer] > section > div:not(.pulltorefresh){
          min-height: #{heights[orientation] - HEADER_HEIGHT - NAV_HEIGHT - FOOTER_HEIGHT}px;
        }
      }
    """
  _style.innerHTML = _code
if window.innerHeight > window.innerWidth
  height = window.innerHeight
  width  = window.innerWidth
else
  height = window.innerWidth
  width  = window.innerHeight
generateStyle {portrait: height, landscape: width}
# generateStyle {portrait: screen.height, landscape: screen.width}