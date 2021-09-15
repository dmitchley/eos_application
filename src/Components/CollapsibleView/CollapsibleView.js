import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
);

const IC_ARR_DOWN = require('../../assets/image/icons/ic_arr_down.png');
const IC_ARR_UP = require('../../assets/image/icons/ic_arr_up.png');

const BACON_IPSUM =
    'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
    {
        id: 1,
        title: "Dance related questions",
        content: [
            {
                id: 1,
                section: 1,
                name: "Is the trial a free class?",
                content: "We offer a satisfaction guarantee for our trial classes. This means that you won't be charged if your child does not wish to sign up after their first session. On the other hand, the trial will be considered as part of the lessons booked when signing up and included in your bill.",
            },
            {
                id: 2,
                section: 1,
                name: "Is the uniform necessary for the trial?",
                content: "No, children can wear comfortable clothing and come bare footed for ballet or wear trainers for tap and street dance",
            },
            {
                id: 3,
                section: 1,
                name: "I already have dance clothes. Can I keep this for regular lessons?",
                content: "Eos Dance School has its own set uniform that can be ordered at the moment of sign-up. Full details can be found in T&Cs and price list",
            },
            {
                id: 4,
                section: 1,
                name: "How do I choose the appropriate level/class for my child?",
                content: "Full description of classes can be found on page 3 of your Class Calendar and Timetable",
            },
            {
                id: 5,
                section: 1,
                name: "Will my child move up on their birthday?",
                content: "Children classes follow the same criteria as school academic years. This means that children will always be with students of their age and be moved up (where applicable) in September",
            },
            {
                id: 6,
                section: 1,
                name: "I have filled in the online form. When can I attend my trial?",
                content: "Immediately. Please refer to your calendar/timetable and let us know if unable to attend the next class on schedule.",
            },
            {
                id: 7,
                section: 1,
                name: "Can I remain and watch the class?",
                content: "Due to Health & Safety, insurance and Child Protection regulations and with the exception of the Big & Small sessions, we regret that we are unable to allow unauthorised adults in our classes. Please see T&Cs for information regarding Open Days. It is always possible to start with the Big & Small if you are worried that your child may not feel secure enough to attend without a parent. Several older children prefer this arrangement, at least for their first few sessions.",
            },
        ],
    },
    // {
    //     id: 2,
    //     title: "Dance related questions:",
    //     content: [
    //         {
    //             id: 3,
    //             section: 2,
    //             name: "Second Section First Item",
    //             content: BACON_IPSUM,
    //         },
    //     ],
    // },
];

export default function App() {
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const [activeSections, setActiveSections] = React.useState([]);
    const ref = React.useRef();

    const renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[
                    styles.subCellContainer,
                    {
                        marginVertical: isActive ? 0 : 8,
                        borderRadius: isActive ? null : 8
                    }
                ]}
                transition="backgroundColor">
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerText}>
                        {section.name}
                    </Text>
                </View>
                <View>
                    <Image style={{ tintColor: '#a5a5a5' }} source={isActive ? IC_ARR_UP : IC_ARR_DOWN} />
                </View>
            </Animatable.View>
        );
    };

    const renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[
                    styles.subCellTitleContainer,
                ]}
                transition="backgroundColor">
                <Animatable.Text
                    animation={isActive ? 'bounceIn' : undefined}
                    style={styles.subCellTitle}>
                    {section.content}
                </Animatable.Text>
            </Animatable.View>

        );
    };

    const setSections = (sections) => {
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };

    return (
        <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.container}
        >
            {CONTENT.map(({ id, title, content }, index) => {
                return (
                    <>
                        <TouchableOpacity
                            key={id}
                            onPress={() => {
                                ref.current.animateNextTransition();
                                setCurrentIndex(index === currentIndex ? null : index);
                            }}
                            style={styles.cardContainer}
                            activeOpacity={0.9}
                        >
                            <View style={styles.cellTitleContainer}>
                                <Text numberOfLines={1} style={styles.cellTitle}>{title}</Text>
                            </View>
                            <View style={styles.arrowContainer}>
                                <Image source={index === currentIndex ? IC_ARR_UP : IC_ARR_DOWN} />
                            </View>
                        </TouchableOpacity>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {index === currentIndex && (
                                <Accordion
                                    activeSections={activeSections}
                                    sections={content}
                                    containerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                                    touchableComponent={TouchableOpacity}
                                    expandMultiple={false}
                                    renderHeader={renderHeader}
                                    renderContent={renderContent}
                                    duration={400}
                                    onChange={setSections}
                                />
                            )}
                        </ScrollView>
                    </>
                );
            })}
        </Transitioning.View>
    );
}