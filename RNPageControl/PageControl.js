var React = require('react-native');
var assign = require('object-assign');

var {StyleSheet, View} = React;

var PageControl = React.createClass({

    propTypes: {
        numberOfPages: React.PropTypes.number.isRequired,
        currentPage: React.PropTypes.number,
        hidesForSinglePage: React.PropTypes.bool,
        pageIndicatorTintColor: React.PropTypes.string,
        currentPageIndicatorTintColor: React.PropTypes.string,
        indicatorSize: React.PropTypes.object,
        indicatorStyle: View.propTypes.style,
        currentIndicatorStyle: View.propTypes.style,
    },

    getDefaultProps: function () {
        return {
            numberOfPages: 0,
            currentPage: 0,
            hidesForSinglePage: false,
            pageIndicatorTintColor: 'gray',
            currentPageIndicatorTintColor: 'white',
            indicatorSize: {width: 8, height: 8},
            indicatorStyle: {},
            currentIndicatorStyle: {}
        };
    },

    render: function () {
        var { style, ...props } = this.props;

        var defaultStyle = {
            height: this.props.indicatorSize.height
        };

        var indicatorItemStyle = {
            width: this.props.indicatorSize.width,
            height: this.props.indicatorSize.height,
            borderRadius: this.props.indicatorSize.height / 2,
            marginLeft: 5,
            marginRight: 5
        };

        var indicatorStyle = assign({}, indicatorItemStyle, this.props.indicatorStyle, {
            backgroundColor: this.props.pageIndicatorTintColor
        });

        var currentIndicatorStyle = assign({}, indicatorItemStyle, this.props.currentIndicatorStyle, {
            backgroundColor: this.props.currentPageIndicatorTintColor
        });

        var pages = [];
        for (var i = 0; i < this.props.numberOfPages; i++) {
            pages.push(i);
        }

        return (
          this.props.hidesForSinglePage && pages.length <= 1 ? null : <View style={[styles.container, defaultStyle, style]}>
              {pages.map((el, i) => <View key={i}
                                          style={i == this.props.currentPage ? currentIndicatorStyle: indicatorStyle} />
              )}
          </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});

module.exports = PageControl;
