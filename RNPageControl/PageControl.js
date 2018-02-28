import React, { Component } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import PropTypes from "prop-types";
import createReactClass from "create-react-class";

var PageControl = createReactClass({

    propTypes: {
        numberOfPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number,
        hidesForSinglePage: PropTypes.bool,
        pageIndicatorTintColor: PropTypes.string,
        currentPageIndicatorTintColor: PropTypes.string,
        indicatorSize: PropTypes.object,
        indicatorStyle: View.propTypes.style,
        currentIndicatorStyle: View.propTypes.style,
        onPageIndicatorPress: PropTypes.func
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
            currentIndicatorStyle: {},
            onPageIndicatorPress: function() {}
        };
    },

    onPageIndicatorPress: function(idx) {
        this.props.onPageIndicatorPress(idx);
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

        var indicatorStyle = [indicatorItemStyle, {backgroundColor: this.props.pageIndicatorTintColor}, this.props.indicatorStyle];
        var currentIndicatorStyle = [indicatorItemStyle, {backgroundColor: this.props.currentPageIndicatorTintColor},this.props.currentIndicatorStyle];

        var pages = [];
        for (var i = 0; i < this.props.numberOfPages; i++) {
            pages.push(i);
        }

        return (
          this.props.hidesForSinglePage && pages.length <= 1 ? null : <View style={[styles.container, defaultStyle, style]}>
              {pages.map((el, i) => <TouchableWithoutFeedback key={i} onPress={this.onPageIndicatorPress.bind(this, i)}>
                    <View style={i == this.props.currentPage ? currentIndicatorStyle: indicatorStyle} />
                </TouchableWithoutFeedback>
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
